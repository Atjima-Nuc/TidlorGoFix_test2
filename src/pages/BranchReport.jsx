import React from 'react';

export default function BranchReport() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="card p-6">
        <h1 className="text-xl font-semibold text-slate-800 mb-1">หน้าแจ้งซ่อม (สาขา)</h1>
        <p className="text-slate-500 text-sm">หลังจากสาขาเข้าสู่ระบบสำเร็จ จะมาที่หน้านี้เพื่อแจ้งซ่อม</p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="label">หัวข้อการแจ้งซ่อม</label>
            <input className="input w-full mt-1" placeholder="เช่น ไฟฟ้าดับที่ชั้น 2" />
          </div>
          <div>
            <label className="label">รหัสสาขา</label>
            <input className="input w-full mt-1" placeholder="BR-001" />
          </div>
          <div className="md:col-span-2">
            <label className="label">รายละเอียด</label>
            <textarea className="input w-full h-32 mt-1" placeholder="อธิบายอาการเสีย อุปกรณ์ที่เกี่ยวข้อง ฯลฯ" />
          </div>
          <div>
            <label className="label">จังหวัด</label>
            <input className="input w-full mt-1" placeholder="กรุงเทพมหานคร" />
          </div>
          <div>
            <label className="label">อำเภอ</label>
            <input className="input w-full mt-1" placeholder="ปทุมวัน" />
          </div>
          <div>
            <label className="label">Region</label>
            <input className="input w-full mt-1" placeholder="Central" />
          </div>
          <div>
            <label className="label">อัปโหลดรูปความเสียหาย</label>
            <input type="file" multiple className="mt-1" />
          </div>
          <div className="md:col-span-2">
            <button className="btn-primary">ส่งคำร้องซ่อม</button>
          </div>
        </div>
      </div>
    </div>
  );
}