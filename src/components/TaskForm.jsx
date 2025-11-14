import React, { useState } from 'react'
import { useTaskContext } from '../contexts/TasksContext';

const TaskForm = () => {

  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const {addTask}=useTaskContext();

  const taskAdd=(e)=>{
    e.preventDefault();
      addTask(title);
      setTitle("");
  }

  return (
    <form onSubmit={taskAdd} className='task-form'>
      <input type="text"
      required
      placeholder='Enter new Task..' 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button type='submit'>AddTask</button>
    </form>
  )
}

export default TaskForm