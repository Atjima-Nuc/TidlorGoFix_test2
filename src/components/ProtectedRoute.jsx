import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthed, getRole } from "../utils/auth";

/**
 * ใช้แบบ:
 *  1) ห่อ children:
 *    <ProtectedRoute allow={["contractor"]}>
 *      <ContractorPage />
 *    </ProtectedRoute>
 *
 *  2) แบบ Outlet (ใน <Routes> ซ้อน):
 *    <Route element={<ProtectedRoute allow={["admin"]} />}>
 *      <Route path="/admin/dashboard" element={<AdminDashboard />} />
 *    </Route>
 */
export default function ProtectedRoute({ allow = [], children, redirect = "/login" }) {
  const location = useLocation();

  // เผื่อ utils/auth ไม่มี ให้ fallback ไปดู localStorage
  const authed = (typeof isAuthed === "function" ? isAuthed() : !!localStorage.getItem("role"));
  const role = (typeof getRole === "function" ? getRole() : localStorage.getItem("role"));

  // ยังไม่ได้ล็อกอิน -> ส่งกลับ /login พร้อมจำ path เดิม
  if (!authed) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  // ล็อกอินแล้วแต่ไม่มีสิทธิ์ตาม allow
  if (allow.length && !allow.includes(role)) {
    return <Navigate to={redirect} replace />;
  }

  // แสดง children ถ้ามี, ไม่งั้นใช้ <Outlet />
  return children ?? <Outlet />;
}