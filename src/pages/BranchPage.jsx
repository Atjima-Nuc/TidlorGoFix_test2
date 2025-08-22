import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, Upload, RefreshCw, Sparkles, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/SectionHeader";


export default function BranchPage({ form, setForm, submitReport, resetForm, reports }) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <Card className="md:col-span-3 card">
        <CardHeader>
          <SectionHeader icon={Building2} title="แจ้งซ่อมจากสาขา" subtitle="กรอกข้อมูลให้ครบและแนบรูปความเสียหาย" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="label">หัวข้อการแจ้ง</label>
              <input className="input mt-1 w-full" placeholder="เช่น ไฟดับ, แอร์ไม่เย็น" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="label">รหัสสาขา</label>
              <input className="input mt-1 w-full"  value={form.branch_code} onChange={(e) => setForm({ ...form, branch_code: e.target.value })} />
            </div>
            <div>
              <label className="label">จังหวัด</label>
              <input className="input mt-1 w-full" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} />
            </div>
            <div>
              <label className="label">อำเภอ/เขต</label>
              <input className="input mt-1 w-full" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
            </div>
            <div>
              <label className="label">Region</label>
              <input className="input mt-1 w-full" placeholder="เหนือ/อีสาน/กลาง/ตะวันออก/ใต้" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="label">รายละเอียดปัญหา</label>
            <textarea rows={4} className="input mt-1 w-full" placeholder="เล่ารายละเอียดและอาการ" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div>
            <label className="label flex items-center gap-2"><Upload className="w-4 h-4" /> รูปภาพความเสียหาย</label>
            <input type="file" multiple className="input mt-1 w-full" onChange={(e) => setForm({ ...form, images: [...e.target.files] })} />
          </div>

          <div className="flex gap-2">
            <Button className="btn-primary" onClick={submitReport}>
              <Sparkles className="w-4 h-4 mr-2" />
              ส่งแจ้งซ่อม
            </Button>
            <Button variant="outline" className="btn-secondary" onClick={resetForm}>
              <RefreshCw className="w-4 h-4 mr-2" />
              ล้างฟอร์ม
            </Button>
          </div>
        </CardContent>
      </Card>
       </div>
  );
}