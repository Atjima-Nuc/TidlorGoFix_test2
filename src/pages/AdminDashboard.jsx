import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Settings2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CategoryBarChart from "@/components/charts/CategoryBarChart";
import SlaPieChart from "@/components/charts/SlaPieChart";
import { CATEGORIES } from "@/utils/classify";

const STATUSES = ["NEW", "ASSIGNED", "IN_PROGRESS", "DONE", "BREACHED"];

export default function AdminDashboard({
  filters,
  setFilters,
  filteredReports,
  reports,
  dashboard,
  updateStatus,
  catChartColors,
}) {
  return (
    <div className="grid md:grid-cols-5 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <SectionHeader icon={Filter} title="ตัวกรองงานซ่อม" subtitle="เลือกตามหมวด/Region/จังหวัด/สถานะ" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select
              className="border rounded-xl px-3 py-2"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">ทุกหมวด</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="border rounded-xl px-3 py-2"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">ทุกสถานะ</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input
              className="border rounded-xl px-3 py-2"
              placeholder="Region"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            />
            <input
              className="border rounded-xl px-3 py-2"
              placeholder="จังหวัด"
              value={filters.province}
              onChange={(e) => setFilters({ ...filters, province: e.target.value })}
            />
          </div>

          <div className="text-sm text-sky-700">{filteredReports.length} รายการ</div>

          <div className="max-h-80 overflow-auto">
            {filteredReports.map((r) => (
              <div key={r.id} className="border rounded-xl p-3 mb-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sky-900">{r.title}</div>
                  <span className="text-xs text-sky-600">{new Date(r.created_at).toLocaleString()}</span>
                </div>
                <div className="text-sm text-sky-700/80">{r.description}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="bg-sky-100 text-sky-700">{r.category}</Badge>
                  <Badge variant="outline">{r.address.region}</Badge>
                  <Badge variant="outline">{r.address.province}</Badge>
                  <Badge variant="outline">SLA {r.sla_hours} ชม.</Badge>
                  <Badge variant="outline">สถานะ {r.status}</Badge>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(r.id, s)}
                      className={`px-2 py-1 rounded-lg text-xs border ${r.status === s ? "bg-sky-600 text-white" : "bg-white"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <SectionHeader icon={Settings2} title="แดชบอร์ดงานซ่อม" subtitle="จำนวนงานตามหมวด + งานเกิน SLA" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <CategoryBarChart data={dashboard.catData} colors={catChartColors} />
            <SlaPieChart inSla={reports.length - dashboard.breached} breached={dashboard.breached} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}