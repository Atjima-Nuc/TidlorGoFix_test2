import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthed, getRole } from '../utils/auth';

export default function ProtectedRoute({ children, allow }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(getRole())) return <Navigate to="/login" replace />;
  return children;
}