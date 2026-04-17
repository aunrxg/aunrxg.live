import { getGithubContributions } from "@/lib/github";
import GithubActivity from "./GithubActivity";

export default async function GithubHeatmapServer() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username || !token) {
    return (
      <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-neutral-50 dark:bg-neutral-900 w-full flex flex-col items-center justify-center text-center h-[300px] mb-32">
        <h3 className="text-xl font-medium mb-2">GitHub Activity Offline</h3>
        <p className="text-neutral-500 text-sm max-w-sm">I'm currently experiencing some API issues with GitHub. Please check back later for updates on my open-source contributions.</p>
      </div>
    );
  }

  try {
    const days = await getGithubContributions(username);
    return <GithubActivity days={days} username={username} />;
  } catch (e) {
    return (
      <div className="p-8 border border-red-200 dark:border-red-900 rounded-3xl bg-red-50 dark:bg-red-950/20 w-full flex flex-col items-center justify-center text-center h-[300px] mb-32">
         <h3 className="text-xl font-medium text-red-600 dark:text-red-400 mb-2">API Error</h3>
         <p className="text-red-500 opacity-80 text-sm">Failed to load GitHub contributions: {(e as Error).message}</p>
      </div>
    );
  }
}
