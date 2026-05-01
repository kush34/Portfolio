import React, { useEffect, useState } from 'react';

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
}

interface Props {
  username: string;
}

const LeetCodeStats: React.FC<Props> = ({ username }) => {
  const stats = {
    easySolved: 253, totalEasy: 932,
    mediumSolved: 124, totalMedium: 2026,
    hardSolved: 5, totalHard: 915,
    totalSolved: 382,
  };

  const levels = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "bg-green-500", text: "text-green-500" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "bg-yellow-500", text: "text-yellow-500" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "bg-red-500", text: "text-red-500" },
  ];

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold">{stats.totalSolved}</span>
        <span className="text-zinc-500 text-sm">problems solved</span>
      </div>

      <div className="flex flex-col gap-4">
        {levels.map(({ label, solved, total, color, text }) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <span className={text}>{label}</span>
              <span className="text-zinc-500">{solved} / {total}</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-500 rounded-full">
              <div
                className={`h-1.5 rounded-full ${color} transition-all duration-700`}
                style={{ width: `${(solved / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeetCodeStats;