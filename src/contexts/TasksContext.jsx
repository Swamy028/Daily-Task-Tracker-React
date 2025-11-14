import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext';
import { api } from '../api';


const Taskscontext=createContext();

export const useTaskContext=()=>useContext(Taskscontext);

const TasksContextProvider = ({children}) => {

  const {token}=useAuthContext();
  const [tasks,setTasks]=useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks=async()=>{
    try {
      setLoading(true);
      const res=await api.get('tasks/all-tasks',{
        headers:{Authorization:`Bearer ${token}`}
      })
      
      setTasks(res.data)
    } catch (error) {
      console.log("Error while fetching tasks",error)
    } finally{
      setLoading(false);
    }
  }

  const addTask=async(title)=>{
    console.log("add task")
     try {
      const res=await api.post('/tasks/add-task',{title},
        {headers:{Authorization:`Bearer ${token}`}}
      )
      
      setTasks(prev=>[...prev,res.data.task])
      
     } catch (error) {
      console.log("error while adding task ",error)
     }
  }
  const updateTask=async(id,updatedData)=>{
     
      try {
        const res=await api.put(`/tasks/update-task/${id}`,updatedData,{
          headers:{Authorization:`Bearer ${token}`}
        });
        //console.log(res.data.task);
        setTasks(prev=>{
         return prev.map(t=>t._id===id?res.data.task:t)
        })
      } catch (error) {
        console.log("error at updateTask ",error.message)
      }
  }
  const deleteTask=async(id)=>{
    console.log(id)
      try {
        const res=await api.delete(`/tasks/delete-task/${id}`,{headers:{Authorization:`Bearer ${token}`}});
        //console.log(res.data.task)
        setTasks(prev=>{
          return prev.filter(t=>t._id!==id)
        })
      } catch (error) {
        console.log("error while deleting task ",error)
      }
  }

  useEffect(()=>{
    if(token){
      //console.log("task context useeffect")
      fetchTasks();
    }
  },[token]);

  return (
    <Taskscontext.Provider value={{addTask,deleteTask,updateTask,tasks}}>
      {children}
    </Taskscontext.Provider>
  )
}

export default TasksContextProvider