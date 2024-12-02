// auth/auth.ts

export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  };
  
  export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };
  
  export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  };
  
  // Helper function to check if user is authenticated
  export const isAuthenticated = () => {
    const token = getAuthToken();
    if (!token) return false;
    
    try {
      // You might want to add token expiration checking here
      return true;
    } catch {
      removeAuthToken();
      return false;
    }
  };
  
  // Helper function to get current user info
  export const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
      const userStr = sessionStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  };