// import { useState } from "react";
// import { useTaskContext } from "../contexts/TasksContext";

// const TaskItem = ({ task }) => {
//   const { updateTask, deleteTask } = useTaskContext();
//   const [isEditing, setIsEditing] = useState(false);
//   const [newTitle, setNewTitle] = useState(task.title);

//   const handleEdit = async (e) => {
//     e.preventDefault();
//     if (!newTitle.trim()) return;
//     await updateTask(task._id, { title: newTitle });
//     setIsEditing(false);
//   };

//   return (
//     <div className="task-item">
//       {isEditing ? (
//         <form onSubmit={handleEdit}>
//           <input
//             type="text"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             autoFocus
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => setIsEditing(false)}>
//             Cancel
//           </button>
//         </form>
//       ) : (
//         <>
//           <div>
//             <input
//               type="checkbox"
//               checked={task.status}
//               onChange={() =>
//                 updateTask(task._id, { completed: !task.completed })
//               }
//             />
//             <span
//               style={{
//                 textDecoration: task.status ? "line-through" : "none",
//               }}
//             >
//               {task.title}
//             </span>
//           </div>
//           <div>
//             <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
//             <button onClick={() => deleteTask(task._id)}>🗑️ Delete</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TaskItem;

import React, { useState } from 'react'
import { useTaskContext } from '../contexts/TasksContext';

const TaskItem = ({ task }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const { updateTask, deleteTask } = useTaskContext();

  // Save edit
  const handleSave = async () => {
    if (!newTitle.trim()) return;
    await updateTask(task._id, { title: newTitle });
    setIsEditing(false);
  };

  return (
    <div className="task-item">

      {/* Checkbox + Title */}
      <div className="check-box-edit">
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => updateTask(task._id, { status: !task.status })}
        />

        {!isEditing ? (
          <span style={{ textDecoration: task.status ? "line-through" : "" }}>
            {task.title}
          </span>
        ) : (
          <input
            type="text"
            value={newTitle}
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();     // Save on Enter
              if (e.key === "Escape") setIsEditing(false); // Cancel on Esc
            }}
          />
        )}
      </div>

      {/* Action buttons */}
      <div className="task-actions">

        {!isEditing ? (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </>
        )}

      </div>
    </div>
  );
};

export default TaskItem;
