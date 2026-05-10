"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
];

interface StatsChartProps {
  yearlyData: { year: string; count: number }[];
  genreData: { genre: string; count: number }[];
  ratingData: { rating: string; count: number }[];
  labels: {
    yearlyChart: string;
    genreChart: string;
    ratingChart: string;
    booksCount: string;
  };
}

export function StatsChart({
  yearlyData,
  genreData,
  ratingData,
  labels,
}: StatsChartProps) {
  return (
    <div className="space-y-12">
      {/* 연도별 독서량 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{labels.yearlyChart}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyData}>
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(v) => [`${v}${labels.booksCount}`, ""]} />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 장르 분포 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{labels.genreChart}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={genreData}
              dataKey="count"
              nameKey="genre"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {genreData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip formatter={(v) => [`${v}${labels.booksCount}`, ""]} />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* 별점 분포 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{labels.ratingChart}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ratingData}>
            <XAxis dataKey="rating" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(v) => [`${v}${labels.booksCount}`, ""]} />
            <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
