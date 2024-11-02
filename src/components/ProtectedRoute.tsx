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

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado para controle de autenticação

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // await axios.get(`${import.meta.env.VITE_API_URL}/auth`, { withCredentials: true }).then((res) => console.log("RESPNSE" + res.data));
        await axios.get(`${import.meta.env.VITE_API_URL}/user/auth`, { withCredentials: true });
        setIsAuthenticated(true); // Se a requisição for bem-sucedida, o usuário está autenticado
      } catch (error) {
        setIsAuthenticated(false); // Se houver um erro, o usuário não está autenticado
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
