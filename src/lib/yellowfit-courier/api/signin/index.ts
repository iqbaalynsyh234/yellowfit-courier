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

  if (data.token) {
   localStorage.setItem('token', data.token);
   localStorage.setItem('user', JSON.stringify(data.user || {}));
   localStorage.setItem('expire_time', data.expire_time);

   // Store in cookies with proper expiration
   const expireDate = new Date(data.expire_time);
   const maxAge = Math.floor((expireDate.getTime() - Date.now()) / 1000);
   document.cookie = `token=${data.token}; path=/; max-age=${maxAge}; SameSite=Strict`;
  }

  return data;
 } catch (error: unknown) {
  console.error('Login error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Login failed';
  throw new Error(errorMessage);
 }
};

// Fungsi untuk logout
export const logoutApi = () => {    
 localStorage.removeItem('token');
 localStorage.removeItem('user');
 localStorage.removeItem('expire_time');

 // Clear cookies
 document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

// Fungsi untuk cek apakah user sudah login
export const isAuthenticated = (): boolean => {
 if (typeof window === 'undefined') return false;

 const token = localStorage.getItem('token');
 const expireTime = localStorage.getItem('expire_time');

 if (!token || !expireTime) return false;

 // Check if token is expired
 const expireDate = new Date(expireTime);
 const now = new Date();

 if (now >= expireDate) {
  logoutApi();
  return false;
 }

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
 } catch (error: unknown) {
  console.error('Request OTP error:', error);
  const message = error instanceof Error ? error.message : 'Request OTP failed';
  throw new Error(message);
 }
};
