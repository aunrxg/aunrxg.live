"use client";

import { useState, MouseEvent, useMemo } from "react";
import { ContributionDay, CommitActivity, getGithubCommitsForDay } from "@/lib/github";
import { HeatmapTooltip, TooltipData } from "./HeatmapTooltip";
import { CommitsModal } from "./CommitsModal";

export default function GithubActivity({ days, username }: { days: ContributionDay[], username: string }) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [commits, setCommits] = useState<CommitActivity[]>([]);
  const [loadingCommits, setLoadingCommits] = useState(false);
  

  const maxCount = useMemo(() => Math.max(...days.map((d) => d.contributionCount)), [days]);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      date: day.date,
      count: day.contributionCount,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  const handleClick = async (day: ContributionDay) => {
    if (day.contributionCount === 0) return;
    setSelectedDate(day.date);
    setIsModalOpen(true);
    setLoadingCommits(true);
    setCommits([]);
    
    try {
      const data = await getGithubCommitsForDay(username, day.date);
      setCommits(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCommits(false);
    }
  };

  function getIntensityClass(count: number) {
    if (count === 0) return "bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800";
    const ratio = count / maxCount;
    if (ratio <= 0.25) return "bg-neutral-200 dark:bg-neutral-800 border-[0.5px] border-neutral-300 dark:border-neutral-700";
    if (ratio <= 0.5) return "bg-neutral-400 dark:bg-neutral-600 border-none";
    if (ratio <= 0.75) return "bg-neutral-600 dark:bg-neutral-400 border-none";
    return "bg-neutral-800 dark:bg-neutral-200 border-none";
  }

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const monthLabels = weeks.map((week, index) => {
    const firstDay = new Date(week[0].date);
    const month = firstDay.toLocaleString("default", { month: "short" });
    if (index === 0) return month;
    const prevFirstDay = new Date(weeks[index - 1][0].date);
    if (prevFirstDay.getMonth() !== firstDay.getMonth()) {
      return month;
    }
    return "";
  });

  const total = days.reduce((sum, d) => sum + d.contributionCount, 0);

  return (
    <div className="w-full mb-32">
      <div className="w-full">
        {/* Months */}
        <div className="flex gap-[2px] md:gap-[3px] text-[10px] md:text-xs font-mono text-neutral-500 mb-2 h-4 w-full">
          {monthLabels.map((label, i) => (
            <div key={i} className="flex-1 relative">
              {label && <span className="absolute left-0 bottom-0 whitespace-nowrap">{label}</span>}
            </div>
          ))}
        </div>
        
        {/* Grid */}
        <div className="flex gap-[2px] md:gap-[3px] w-full">
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex-1 flex flex-col gap-[2px] md:gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  onMouseEnter={(e: any) => handleMouseEnter(e, day)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(day)}
                  className={`w-full aspect-square rounded-[2px] transition-opacity cursor-pointer hover:opacity-50 relative ${getIntensityClass(day.contributionCount)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 text-[10px] md:text-xs font-mono text-neutral-500 gap-3">
        <div>
           {total} contributions in the last year on <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-300 underline underline-offset-2 transition-colors">GitHub</a>.
        </div>
        <div className="flex gap-1.5 items-center">
           <span>Less</span>
           <div className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px] ${getIntensityClass(0)}`}></div>
           <div className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px] ${getIntensityClass(Math.max(1, maxCount * 0.25))}`}></div>
           <div className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px] ${getIntensityClass(Math.max(1, maxCount * 0.5))}`}></div>
           <div className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px] ${getIntensityClass(Math.max(1, maxCount * 0.75))}`}></div>
           <div className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px] ${getIntensityClass(maxCount)}`}></div>
           <span>More</span>
        </div>
      </div>

      <HeatmapTooltip data={tooltip} />
      
      {/* <CommitsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        date={selectedDate} 
        commits={commits} 
        loading={loadingCommits} 
      /> */}
    </div>
  );
}
