const KEYS = {
  token: 'tlgf_token',
  role: 'tlgf_role' // 'branch' | 'admin' | 'contractor'
};

export function login({ username, password, roleHint }) {
  if (!username || !password) throw new Error('กรอกข้อมูลให้ครบ');

  if (roleHint === 'branch') {
    if (/^\d+$/.test(username))  {
      localStorage.setItem(KEYS.token, 'branch_token');
      localStorage.setItem(KEYS.role, 'branch');
      return { role: 'branch' };
    }
    throw new Error('กรุณากรอกรหัสสาขา');
  }

  if (roleHint === 'admin') {
    if (username.toLowerCase() === 'admin') {
      localStorage.setItem(KEYS.token, 'admin_token');
      localStorage.setItem(KEYS.role, 'admin');
      return { role: 'admin' };
    }
    throw new Error('สำหรับแอดมินให้ใช้ username = admin (ตัวอย่าง)');
  }

  if (roleHint === 'contractor') {
    localStorage.setItem(KEYS.token, 'contractor_token');
    localStorage.setItem(KEYS.role, 'contractor');
    return { role: 'contractor' };
  }

  throw new Error('ไม่รู้จักบทบาท');
}

export function logout() {
  localStorage.removeItem(KEYS.token);
  localStorage.removeItem(KEYS.role);
}

export function getRole() {
  return localStorage.getItem(KEYS.role);
}

export function isAuthed() {
  return Boolean(localStorage.getItem(KEYS.token));
}