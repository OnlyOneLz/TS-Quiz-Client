import { useEffect } from 'react';

export const useAuth = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href =  '/login'; 
    }
  }, []);

  return;
};