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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

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

  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  
  const easyPercent = (stats.easySolved / stats.totalSolved) * 100;
  const mediumPercent = (stats.mediumSolved / stats.totalSolved) * 100;
  const hardPercent = (stats.hardSolved / stats.totalSolved) * 100;
  
  const easyLength = (easyPercent / 100) * circumference;
  const mediumLength = (mediumPercent / 100) * circumference;
  const hardLength = (hardPercent / 100) * circumference;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-16 rounded-xl p-8 shadow tech">
      <div className="relative w-56 h-56">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke={isDark ? "#1f2937" : "#e5e5e5"}
            strokeWidth="20"
            fill="none"
          />
          
          {/* Easy (Green) */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="#22c55e"
            strokeWidth="20"
            fill="none"
            strokeDasharray={`${easyLength} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="butt"
            className="transition-all duration-1000"
          />
          
          {/* Medium (Yellow) */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="#eab308"
            strokeWidth="20"
            fill="none"
            strokeDasharray={`${mediumLength} ${circumference}`}
            strokeDashoffset={-easyLength}
            strokeLinecap="butt"
            className="transition-all duration-1000"
          />
          
          {/* Hard (Red) */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="#ef4444"
            strokeWidth="20"
            fill="none"
            strokeDasharray={`${hardLength} ${circumference}`}
            strokeDashoffset={-(easyLength + mediumLength)}
            strokeLinecap="butt"
            className="transition-all duration-1000"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl xl:text-5xl font-bold">{stats.totalSolved}</div>
          <div className="text-base">/{stats.totalQuestions}</div>
          <div className="text-xs mt-1">✓ Solved</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 xl:gap-12">
        <div className="rounded p-12">
          <div className="text-green-500 font-semibold text-xl m-2">Easy</div>
          <div className="text-lg font-bold">{stats.easySolved}/{stats.totalEasy}</div>
        </div>
        <div className="rounded p-12">
          <div className="text-yellow-500 font-semibold text-xl mb-2">Medium</div>
          <div className="text-lg font-bold">{stats.mediumSolved}/{stats.totalMedium}</div>
        </div>
        <div className="rounded p-12">
          <div className="text-red-500 font-semibold text-xl mb-2">Hard</div>
          <div className="text-lg font-bold">{stats.hardSolved}/{stats.totalHard}</div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStats;