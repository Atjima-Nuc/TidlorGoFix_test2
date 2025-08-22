import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

export default function SlaPieChart({ inSla, breached }) {
  const data = [
    { name: "ภายใน SLA", value: Math.max(0, inSla) },
    { name: "เกิน SLA", value: breached },
  ];
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={40}
            strokeWidth={2}
          >
            <Cell fill="#0ea5e9" />
            <Cell fill="#94a3b8" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
