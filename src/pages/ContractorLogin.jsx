import React, { useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function ContractorLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { role } = login({ username, password, roleHint: 'contractor' });
      if (role === 'contractor') navigate('/contractor/login'); // TODO: change to jobs page later
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="card max-w-xl w-full p-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-1">เข้าสู่ระบบผู้รับเหมา</h1>
        <p className="text-slate-500 text-sm mb-6">ยังไม่มีบัญชี? <Link to="/contractor/register" className="text-brand-700 underline">ลงทะเบียน</Link></p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input className="input w-full mt-1" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input w-full mt-1" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button className="btn-primary w-full">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
}