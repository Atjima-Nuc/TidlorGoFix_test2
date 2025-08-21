import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginUnified from './pages/LoginUnified';
import ContractorRegister from './pages/ContractorRegister';
import ContractorLogin from './pages/ContractorLogin';
import BranchReport from './pages/BranchReport';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
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
                <BranchReport />
              </ProtectedRoute>
            } />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute allow={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}