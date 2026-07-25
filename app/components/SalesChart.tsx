"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

export default function SalesChart({
  data,
}: {
  data: {
    day: string;
    total: number;
  }[];
}) {
  return (
    <div className="mt-10 rounded-2xl bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        📈 Penjualan 7 Hari Terakhir
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>

          <XAxis dataKey="day" />

          <Tooltip />

          <Bar
            dataKey="total"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}