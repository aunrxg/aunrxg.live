"use server";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export async function getGithubContributions(username: string): Promise<ContributionDay[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is not defined in environment variables.");
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 }, 
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
  const days: ContributionDay[] = weeks.flatMap((week: any) => week.contributionDays);
  
  return days;
}

export interface CommitActivity {
  id: string;
  message: string;
  url: string;
  repo: string;
  date: string;
}

export async function getGithubCommitsForDay(username: string, date: string): Promise<CommitActivity[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const q = `author:${username} author-date:${date}..${date}`;
  const response = await fetch(`https://api.github.com/search/commits?q=${encodeURIComponent(q)}&sort=author-date&order=desc`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const commits: CommitActivity[] = data.items.map((item: any) => ({
    id: item.sha,
    message: item.commit.message.split('\n')[0],
    url: item.html_url,
    repo: item.repository.full_name,
    date: item.commit.author.date,
  }));

  return commits;
}
