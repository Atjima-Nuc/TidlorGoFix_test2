import React, { useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginUnified() {
  const [tab, setTab] = useState('branch');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();


  const onSubmit = (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { role } = login({ username, password, roleHint: tab });
      if (role === 'branch') navigate('/branch/report');
      if (role === 'admin') navigate('/admin/dashboard');
      if (role === 'contractor') navigate('/contractor/task');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="card max-w-xl w-full p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">เข้าสู่ระบบ (สาขา & แอดมิน)</h1>
            <p className="text-slate-500 text-sm">สาขาใช้ <b>รหัสสาขา</b> เป็น username</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('branch')} className={`px-3 py-2 rounded-xl border text-sm ${tab==='branch' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 hover:border-brand-300'}`}>สาขา</button>
          <button onClick={() => setTab('admin')} className={`px-3 py-2 rounded-xl border text-sm ${tab==='admin' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 hover:border-brand-300'}`}>แอดมิน</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input className="input w-full mt-1" placeholder={tab==='branch' ? 'รหัสสาขา' : 'admin'} value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input w-full mt-1" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button className="btn-primary w-full">เข้าสู่ระบบ</button>
        </form>

        <div className="mt-6 text-sm text-slate-600 flex flex-wrap items-center gap-2">
          <Building2 size={16} />
          <span>ผู้รับเหมา? ไปที่</span>
          <Link className="text-brand-700 underline" to="/contractor/login">หน้า Login ผู้รับเหมา</Link>
          <span>หรือ</span>
          <Link className="text-brand-700 underline" to="/contractor/register">ลงทะเบียนใหม่</Link>
          <Sparkles size={16} className="text-brand-600"/>
        </div>
      </div>
    </div>
  );
}