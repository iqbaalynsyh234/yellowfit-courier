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
    console.log('Login response:', data);
    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    const errorMessage = error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};
