import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ContractorRegister() {
  const [entityType, setEntityType] = useState('บุคคลธรรมดา');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState([]);
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setErr('');
    if (!name || !username || !password) {
      setErr('กรอกข้อมูลที่จำเป็นให้ครบ');
      return;
    }
    if (!agree) {
      setErr('กรุณายอมรับเงื่อนไขการใช้งาน');
      return;
    }
    // TODO: call backend API
    navigate('/contractor/login');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="card w-full max-w-2xl p-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-1">ลงทะเบียนผู้รับเหมา</h1>
        <p className="text-slate-500 text-sm mb-6">หลังลงทะเบียนสำเร็จ ระบบจะพาไปหน้า Login ของผู้รับเหมาอัตโนมัติ</p>

        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="label">ประเภทนิติบุคคล</label>
            <select value={entityType} onChange={(e)=>setEntityType(e.target.value)} className="input w-full mt-1">
              <option>นิติบุคคล</option>
              <option>บุคคลธรรมดา</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="label">ชื่อบริษัท / ชื่อผู้รับเหมา</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="input w-full mt-1" placeholder="เช่น บริษัท เอ บี ซี จำกัด" />
          </div>

          <div className="md:col-span-2">
            <label className="label">อัปโหลดเอกสารตรวจคู่ค้า (PDF/Images)</label>
            <input type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files))} className="mt-1" />
            {files?.length > 0 && (
              <p className="text-xs text-slate-500 mt-2">ไฟล์ที่เลือก: {files.map(f=>f.name).join(', ')}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="label">ตั้ง Username</label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} className="input w-full mt-1" />
          </div>
          <div className="md:col-span-1">
            <label className="label">ตั้ง Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input w-full mt-1" />
          </div>

          <div className="md:col-span-2 flex items-center gap-2 mt-2">
            <input id="agree" type="checkbox" checked={agree} onChange={()=>setAgree(!agree)} />
            <label htmlFor="agree" className="text-sm text-slate-600">ยอมรับเงื่อนไขและนโยบายความเป็นส่วนตัว</label>
          </div>

          {err && <p className="md:col-span-2 text-red-600 text-sm">{err}</p>}
          <div className="md:col-span-2 flex gap-3 mt-2">
            <button className="btn-primary">ลงทะเบียน</button>
            <Link to="/contractor/login" className="btn-secondary">ไปหน้า Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}