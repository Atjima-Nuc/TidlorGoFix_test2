import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// mock useNavigate so we can assert redirects
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import LoginUnified from '../pages/LoginUnified.jsx';
import ContractorRegister from '../pages/ContractorRegister.jsx';

beforeEach(() => { mockNavigate.mockReset(); localStorage.clear(); });

describe('LoginUnified (Branch/Admin)', () => {
  it('renders tabs', () => {
    render(<LoginUnified />);
    expect(screen.getByText('เข้าสู่ระบบ (สาขา & แอดมิน)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'สาขา' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'แอดมิน' })).toBeInTheDocument();
  });

  it('admin login navigates to /admin/dashboard when username=admin', () => {
    render(<LoginUnified />);
    fireEvent.click(screen.getByRole('button', { name: 'แอดมิน' }));
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'x' } });
    fireEvent.click(screen.getByRole('button', { name: 'เข้าสู่ระบบ' }));
    expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard');
  });

  it('branch login with BR-001 navigates to /branch/report', () => {
    render(<LoginUnified />);
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'BR-001' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'x' } });
    fireEvent.click(screen.getByRole('button', { name: 'เข้าสู่ระบบ' }));
    expect(mockNavigate).toHaveBeenCalledWith('/branch/report');
  });
});

describe('Contractor registration', () => {
  it('redirects to contractor login after successful registration', () => {
    render(<ContractorRegister />);
    fireEvent.change(screen.getByLabelText('ชื่อบริษัท / ชื่อผู้รับเหมา'), { target: { value: 'ACME' } });
    fireEvent.change(screen.getByLabelText('ตั้ง Username'), { target: { value: 'john' } });
    fireEvent.change(screen.getByLabelText('ตั้ง Password'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByLabelText('ยอมรับเงื่อนไขและนโยบายความเป็นส่วนตัว'));
    fireEvent.click(screen.getByRole('button', { name: 'ลงทะเบียน' }));
    expect(mockNavigate).toHaveBeenCalledWith('/contractor/login');
  });
});