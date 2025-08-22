import React from "react";

export default function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-sky-100">
          <Icon className="w-5 h-5 text-sky-700" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-sky-800">{title}</h3>
          {subtitle && <p className="text-sm text-sky-600">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}