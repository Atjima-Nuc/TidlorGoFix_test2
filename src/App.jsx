import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginUnified from './pages/LoginUnified';
import ContractorRegister from './pages/ContractorRegister';
import ContractorLogin from './pages/ContractorLogin';
import BranchPage from './pages/BranchPage';
import AdminDashboard from './pages/AdminDashboard';
import { Wrench } from "lucide-react";
import { demoReports } from "./data/demoReports";
import { demoContractors } from "@/data/demoContractors";
import ContractorPage from "@/pages/ContractorPage";
import { classify, CATEGORIES } from "@/utils/classify";
import { similarity } from "@/utils/similarity";

export default function App() {

  const blue = {
    bg: "bg-gradient-to-br from-sky-50 via-white to-sky-100",
    primary: "text-sky-700",
    ring: "focus:ring focus:ring-sky-300",
    btn: "bg-sky-600 hover:bg-sky-700 text-white",
    chip: "bg-sky-100 text-sky-700",
  };

  const [tab, setTab] = useState("branch");
  const [useLive, setUseLive] = useState(false);
 const [apiBase, setApiBase] = useState(import.meta.env.VITE_API_BASE || "http://localhost:8000");

  // in-memory
  const [reports, setReports] = useState(demoReports);
  const [contractors, setContractors] = useState(demoContractors);

  // branch form
  const [form, setForm] = useState({
    title: "",
    description: "",
    province: "",
    district: "",
    region: "",
    branch_code: "",
    images: [],
  });

  // admin filters
  const [filters, setFilters] = useState({ category: "", region: "", province: "", status: "" });

  // contractor profile
  const [me, setMe] = useState({ id: "ME", name: "ช่างใหม่", skills: [], provinces: [], bio: "" });

  const filteredReports = useMemo(() => {
    return reports.filter(
      (r) =>
        (!filters.category || r.category === filters.category) &&
        (!filters.region || r.address.region === filters.region) &&
        (!filters.province || r.address.province === filters.province) &&
        (!filters.status || r.status === filters.status)
    );
  }, [reports, filters]);

  const dashboard = useMemo(() => {
    const byCat = {};
    const now = Date.now();
    let breached = 0;
    reports.forEach((r) => {
      byCat[r.category] = (byCat[r.category] || 0) + 1;
      const ageH = (now - r.created_at) / 36e5;
      if (ageH > r.sla_hours && r.status !== "DONE") breached++;
    });
    const catData = Object.entries(byCat).map(([name, value]) => ({ name, value }));
    return { catData, breached };
  }, [reports]);

  function resetForm() {
    setForm({ title: "", description: "", province: "", district: "", region: "", branch_code: "", images: [] });
  }

  async function submitReport() {
    const payload = {
      title: form.title,
      description: form.description,
      images: form.images.map((f) => f.name || "local"),
      address: { province: form.province, district: form.district, region: form.region, branch_code: form.branch_code },
    };

    if (useLive) {
      try {
        const res = await fetch(`${apiBase}/reports`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        setReports((prev) => [data, ...prev]);
        resetForm();
        return;
      } catch (e) {
        console.error(e);
      }
    }

    // mock path
    const cat = classify(`${payload.title} ${payload.description}`);
    const sla = cat === "ไฟฟ้า" ? 12 : cat === "ประปา" ? 24 : cat === "แอร์" ? 48 : 72;
    const newR = {
      id: `R-${Math.floor(Math.random() * 9000 + 1000)}`,
      title: payload.title,
      description: payload.description,
      images: payload.images,
      address: payload.address,
      category: cat,
      status: "NEW",
      created_at: Date.now(),
      sla_hours: sla,
    };
    setReports((prev) => [newR, ...prev]);
    resetForm();
  }

  function updateStatus(id, status) {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  const recs = useMemo(() => {
    const myDesc = `${me.skills.join(" ")} ${me.bio}`;
    return reports
      .map((r) => {
        const base = similarity(myDesc, `${r.title} ${r.description}`);
        const catBonus = me.skills.includes(r.category) ? 0.4 : 0;
        const provBonus = me.provinces.includes(r.address.province) ? 0.3 : 0;
        return { ...r, score: +(base + catBonus + provBonus).toFixed(3) };
      })
      .sort((a, b) => b.score - a.score);
  }, [me, reports]);

  const catChartColors = ["#0284c7", "#38bdf8", "#0ea5e9", "#7dd3fc"];

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginUnified />} />
            <Route path="/contractor/register" element={<ContractorRegister/>} />
            <Route path="/contractor/login" element={<ContractorLogin />} />

            <Route path="/branch/report" element={
              <ProtectedRoute allow={["branch"]}>
                <BranchPage 
                form={form}
                setForm={setForm}
                submitReport={submitReport}
                resetForm={resetForm}
                reports={reports}/>
              </ProtectedRoute>
            } />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute allow={["admin"]}>
                <AdminDashboard 
                filters={filters}
                setFilters={setFilters}
                filteredReports={filteredReports}
                reports={reports}
                dashboard={dashboard}
                updateStatus={updateStatus}
                catChartColors={catChartColors}/>
              </ProtectedRoute>
            } />

            <Route path="/contractor/task" element={
              <ProtectedRoute allow={["contractor"]}>
                <ContractorPage me={me} setMe={setMe} recs={recs}/>
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}