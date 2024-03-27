import { useEffect } from 'react';
export const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href =  '/login'; 
    }

};
export default checkToken