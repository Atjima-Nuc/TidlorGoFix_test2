import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { logout } from '../utils/auth.js';

beforeEach(() => { localStorage.clear(); });

function Dummy() { return <div>OK</div>; }

describe('ProtectedRoute', () => {
  it('redirects to /login when not authed', () => {
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/secret" element={<ProtectedRoute allow={["admin"]}><Dummy /></ProtectedRoute>} />
          <Route path="/login" element={<div>LOGIN</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  it('blocks wrong role', () => {
    localStorage.setItem('tlgf_token','t');
    localStorage.setItem('tlgf_role','branch');
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/secret" element={<ProtectedRoute allow={["admin"]}><Dummy /></ProtectedRoute>} />
          <Route path="/login" element={<div>LOGIN</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  it('allows correct role', () => {
    localStorage.setItem('tlgf_token','t');
    localStorage.setItem('tlgf_role','admin');
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/secret" element={<ProtectedRoute allow={["admin"]}><Dummy /></ProtectedRoute>} />
          <Route path="/login" element={<div>LOGIN</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('OK')).toBeInTheDocument();
  });
});