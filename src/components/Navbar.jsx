import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthed, getRole } from '../utils/auth';
import { Wrench, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const authed = isAuthed();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white shadow-[var(--shadow-soft)]">
            <Wrench size={18} />
          </div>
          <span className="font-semibold text-slate-800">TidLor Go Fix</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link className="btn-secondary" to="/login">สาขา/แอดมิน Login</Link>
          <Link className="btn-secondary" to="/contractor/login">ผู้รับเหมา Login</Link>
          <Link className="btn-primary" to="/contractor/register">ลงทะเบียนผู้รับเหมา</Link>
          {authed && (
            <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
              <LogOut size={16} /> ออกจากระบบ
            </button>
          )}
          {authed && (
            <span className="text-slate-500">เข้าสู่ระบบเป็น: <b className="capitalize">{role}</b></span>
          )}
        </div>
      </div>
    </nav>
  );
}