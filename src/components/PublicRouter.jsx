import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRouter = ({children}) => {
  const{user,loading}=useAuthContext();
  if(loading) return <div>Loading...</div>;
  
  if(user) return <Navigate to='/'/>

  return children
}

export default PublicRouter