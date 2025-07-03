export const signinApi = async (credentials: { phone: string }) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Login response:', data);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || {}));
      localStorage.setItem('loginTime', new Date().toISOString());
    }
    
    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    const errorMessage = error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

// Fungsi untuk logout
export const logoutApi = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('loginTime');
};

// Fungsi untuk cek apakah user sudah login
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');
  
  if (!token || !loginTime) return false;
  
  // const loginDate = new Date(loginTime);
  // const now = new Date();
  // const daysDiff = (now.getTime() - loginDate.getTime()) / (1000 * 3600 * 24);
  
  // if (daysDiff > 7) {
  //   logoutApi();
  //   return false;
  // }
  return true;
};

// Fungsi untuk mendapatkan user data
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const requestOtpApi = async (phone: string) => {
  try {
    const response = await fetch('/api/login/request-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Request OTP failed');
    }
    return data;
  } catch (error: any) {
    console.error('Request OTP error:', error);
    throw new Error(error.message || 'Request OTP failed');
  }
};
