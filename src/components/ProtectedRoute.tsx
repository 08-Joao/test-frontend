// // ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const token = Cookies.get('token');

//   if (!token) {
//     console.log("NKDSJFBNKJSDBFJBSDF ---> ", token)
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/user/auth`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false); 
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Exiba um carregando enquanto verifica a autenticação
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redireciona para login se não estiver autenticado
  }

  return children; // Retorna os filhos se estiver autenticado
};

export default ProtectedRoute;
