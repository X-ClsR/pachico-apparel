"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: {
    day: string;
    total: number;
  }[];
};

export default function RevenueChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
      <h2 className="mb-6 text-2xl font-bold">
        Revenue 7 Hari
      </h2>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <XAxis dataKey="day" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#ffffff"
              fill="#525252"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}