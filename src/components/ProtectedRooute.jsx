import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const ProtectedRooute = ({children}) => {

  const navigate=useNavigate();
   const {user,loading}=useAuthContext();

   if (loading) return <div>Loading...</div>;   // ⭐ WAIT FOR AUTH


   if(user) return children;

   else return <Navigate to='/login' />
}

export default ProtectedRooute