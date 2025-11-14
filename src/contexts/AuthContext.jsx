import React, { createContext, useContext,useEffect,useState } from 'react'
import { api } from '../api';

const AuthContext=createContext();

export const useAuthContext=()=>useContext(AuthContext);

const AuthContextProvider = ({children}) => {
  const [user,setUser]=useState(null);
  const [token,setToken]=useState(localStorage.getItem('token')||null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{

    if(!token){
      setLoading(false)
      return;
    }

    api.get('/users/me',{
      headers:{Authorization:`Bearer ${token}`}
    })
    .then(res=>{setUser(res.data)})
    .catch(()=>localStorage.removeItem('token'))
    .finally(()=>setLoading(false));
  },[])

  const login=(userData,token)=>{
    //console.log("login in auth context")
    localStorage.setItem('token',token);
    setToken(token); //added
    setUser(userData);
  }
  
  const logout=()=>{
    localStorage.removeItem('token');
    setUser(null);
  }
  return (
    <>
    <AuthContext.Provider value={{user,login,logout,token,loading}}>
      {children}
    </AuthContext.Provider>
    </>
  )
}

export default AuthContextProvider