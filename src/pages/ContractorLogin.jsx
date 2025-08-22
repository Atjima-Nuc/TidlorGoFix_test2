import React, { useEffect, useState } from 'react';
import { login, getRole } from '../utils/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function ContractorLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // ถ้าเป็น contractor อยู่แล้ว ให้เด้งไป task
  useEffect(() => {
    if (getRole() === "contractor") {
      navigate("/contractor/task", { replace: true });
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      // สำคัญ: เรียก login() เพื่อ set tlgf_token/tlgf_role
      const { role } = login({ username, password, roleHint: 'contractor' });
      if (role === 'contractor') {
        const from = location.state?.from?.pathname || "/contractor/task";
        navigate(from, { replace: true });
      } else {
        setErr('บทบาทไม่ถูกต้อง');
      }
    } catch (e) {
      setErr(e.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="card max-w-xl w-full p-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-1">เข้าสู่ระบบผู้รับเหมา</h1>
        <p className="text-slate-500 text-sm mb-6">
          ยังไม่มีบัญชี? <Link to="/contractor/register" className="text-brand-700 underline">ลงทะเบียน</Link>
        </p>

        {/* แก้ onSubmit ให้เรียก handleSubmit */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input className="input w-full mt-1" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input w-full mt-1" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button type="submit" className="btn-primary w-full">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
}