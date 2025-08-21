import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-slate-700 font-semibold">งานใหม่วันนี้</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
        </div>
        <div className="card p-6">
          <h3 className="text-slate-700 font-semibold">กำลังดำเนินการ</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">34</p>
        </div>
        <div className="card p-6">
          <h3 className="text-slate-700 font-semibold">SLA เกินกำหนด</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">3</p>
        </div>
      </div>

      <div className="card p-6 mt-6">
        <h1 className="text-xl font-semibold text-slate-800">แดชบอร์ดแอดมิน</h1>
        <p className="text-slate-500 text-sm">ตัวอย่างหน้าเพื่อ Monitor งานซ่อมและ SLA</p>
        <div className="mt-4 flex gap-3">
          <select className="input">
            <option>ทุกหมวดหมู่</option>
            <option>ประปา</option>
            <option>แอร์</option>
            <option>ไฟฟ้า</option>
          </select>
          <select className="input">
            <option>ทุก Region</option>
            <option>North</option>
            <option>Central</option>
            <option>South</option>
          </select>
          <select className="input">
            <option>ทุกจังหวัด</option>
            <option>กรุงเทพฯ</option>
            <option>เชียงใหม่</option>
            <option>ภูเก็ต</option>
          </select>
          <button className="btn-secondary">รีเฟรช</button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2">เลขที่งาน</th>
                <th>หัวข้อ</th>
                <th>หมวดหมู่</th>
                <th>สาขา</th>
                <th>จังหวัด</th>
                <th>SLA</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({length:6}).map((_,i)=> (
                <tr key={i} className="border-t hover:bg-slate-50/60">
                  <td className="py-2">WO-24-{1000+i}</td>
                  <td>ซ่อมแอร์ชั้น 3</td>
                  <td>แอร์</td>
                  <td>BR-00{i+1}</td>
                  <td>กรุงเทพฯ</td>
                  <td>8 ชม.</td>
                  <td><span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700">รอดำเนินการ</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}