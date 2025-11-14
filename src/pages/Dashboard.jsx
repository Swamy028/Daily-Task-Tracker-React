import React, { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { api } from '../api';
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

const Dashboard = () => {

  const {user,logout}=useAuthContext()
  const [userData,setUserData]=useState(null);

  const handleLogout=()=>{
   logout();
  }

  const getUser=async()=>{
    try {
      const token=localStorage.getItem('token')
      const res=await api.get('/users/me',{
        headers:{Authorization:`Bearer ${token}`}
      });
      console.log(res)
      setUserData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='dashboard'>
      <header className='header'>
        <h2>🗓️ Welcome, {user?.name}</h2>
        <button onClick={logout}>Logout</button>
      </header>
      <h3 style={{margin:"0 0 15px 0",textAlign:"center"}}>Daily Task Tracker</h3>
      <div className='tasks-div'>
        <TaskForm/>
        <TaskList/>
      </div>
      
    </div>
  )
}

export default Dashboard