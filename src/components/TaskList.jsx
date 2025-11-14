

import React, { useState } from 'react'
import { useTaskContext } from '../contexts/TasksContext'
import TaskItem from './TaskItem';
import ProgressBar from './ProgressBar'

const TaskList = () => {
  const { tasks, loading } = useTaskContext();
  const [filter, setFilter] = useState("all");

  if (loading) return <div>Loading ...</div>
  if (tasks?.length == 0) return <div>No tasks Yet.. add one..</div>

  const total = tasks.length;
  const completedCount = tasks.filter(t => t.status).length;

  const percentage = Math.round((completedCount / total) * 100);
  
  let tasksMap=tasks;
  
  if(filter==="pending"){
    tasksMap=tasks.filter(t=>!t.status)
  }else if(filter==="completed"){
    tasksMap=tasks.filter(t=>t.status)
  }
  
  return (
    <div>
      <div className='task-status'>
        <button className={filter==="all"?'selected':""} onClick={() => setFilter("all")}>All</button>
        <button className={filter==="pending"?"active":""} onClick={() => setFilter("pending")}>Pending</button>
        <button className={filter==="completed"?"active":""} onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ProgressBar completedTasks={completedCount} percentage={percentage} total={total} />
      {
        tasksMap.map(t => {
          return <TaskItem key={t._id} task={t} />
        })
      }
    </div>
  )
}

export default TaskList