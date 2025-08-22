import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { CATEGORIES } from "@/utils/classify";

export default function ContractorPage({ me, setMe, recs, blue }) {
  return (
    <div className="grid md:grid-cols-5 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <SectionHeader icon={Wrench} title="โปรไฟล์ผู้รับเหมา" subtitle="ทักษะ/พื้นที่ให้บริการ" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm text-sky-700">ชื่อผู้รับเหมา</label>
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={me.name}
              onChange={(e) => setMe({ ...me, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-sky-700">ทักษะ</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c !== "อื่นๆ").map((c) => {
                const on = me.skills.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() =>
                      setMe({ ...me, skills: on ? me.skills.filter((x) => x !== c) : [...me.skills, c] })
                    }
                    className={`px-3 py-1.5 rounded-xl border ${on ? "bg-sky-600 text-white" : "bg-white"}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm text-sky-700">จังหวัดให้บริการ</label>
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              placeholder="เช่น กรุงเทพฯ, นนทบุรี"
              value={me.provinces.join(", ")}
              onChange={(e) => setMe({ ...me, provinces: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
            />
          </div>

          <div>
            <label className="text-sm text-sky-700">แนะนำตัว</label>
            <textarea
              className="mt-1 w-full border rounded-xl px-3 py-2"
              rows={3}
              value={me.bio}
              onChange={(e) => setMe({ ...me, bio: e.target.value })}
            ></textarea>
          </div>

          <Button className="btn-primary rounded-xl" onClick={() => alert("บันทึกโปรไฟล์เรียบร้อย (โหมดสาธิต)")}>
            บันทึกโปรไฟล์
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <SectionHeader icon={CheckCircle} title="งานที่ระบบแนะนำให้คุณ" subtitle="เรียงตามคะแนนความสอดคล้อง" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-sky-700 mb-2">
            โปรไฟล์: {me.skills.length ? me.skills.join(", ") : "(ยังไม่ได้เลือกทักษะ)"} • จังหวัด:{" "}
            {me.provinces.join(", ") || "(ยังไม่ได้ระบุ)"}
          </div>
          <div className="max-h-96 overflow-auto">
            {recs.map((r) => (
              <div key={r.id} className="border rounded-xl p-3 mb-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sky-900">
                    {r.title} <span className="text-xs text-sky-600">({r.category})</span>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-lg bg-sky-100 text-sky-700">score {r.score}</div>
                </div>
                <div className="text-sm text-sky-700/80">{r.description}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline">{r.address.province}</Badge>
                  <Badge variant="outline">SLA {r.sla_hours} ชม.</Badge>
                  <Badge variant="outline">สถานะ {r.status}</Badge>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button className="rounded-xl">ดูรายละเอียด</Button>
                  <Button variant="outline" className="rounded-xl">
                    รับงาน
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}