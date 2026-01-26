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
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await res.json();

        setStats({
          totalSolved: data.totalSolved,
          totalQuestions: data.totalQuestions,
          easySolved: data.easySolved,
          totalEasy: data.totalEasy,
          mediumSolved: data.mediumSolved,
          totalMedium: data.totalMedium,
          hardSolved: data.hardSolved,
          totalHard: data.totalHard,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  if (loading) return <div className="text-gray-400 text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
  if (!stats) return null;

  const percentage = (stats.totalSolved / stats.totalQuestions) * 100;
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center gap-16 rounded-xl p-8 border border-gray-800">
      <div className="relative w-56 h-56">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="#1f2937"
            strokeWidth="20"
            fill="none"
          />
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="#ffe600"
            strokeWidth="20"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-white">{stats.totalSolved}</div>
          <div className="text-gray-500 text-base">/{stats.totalQuestions}</div>
          <div className="text-green-500 text-xs mt-1">✓ Solved</div>
        </div>
      </div>

      <div className="flex gap-12">
        <div className="rounded-lg p-12 border border-gray-800">
          <div className="text-yellow-500 font-semibold text-xl m-2">Easy</div>
          <div className="text-white text-lg font-bold">{stats.easySolved}/{stats.totalEasy}</div>
        </div>
        <div className="rounded-lg p-12 border border-gray-800">
          <div className="text-cyan-400 font-semibold text-xl mb-2">Medium</div>
          <div className="text-white text-lg font-bold">{stats.mediumSolved}/{stats.totalMedium}</div>
        </div>
        <div className="rounded-lg p-12 border border-gray-800">
          <div className="text-red-500 font-semibold text-xl mb-2">Hard</div>
          <div className="text-white text-lg font-bold">{stats.hardSolved}/{stats.totalHard}</div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStats;