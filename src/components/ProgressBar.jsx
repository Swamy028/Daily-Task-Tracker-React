// const ProgressBar = ({ percentage, completed, total }) => {
//   return (
//     <div style={{ margin: "20px 0" }}>
//       <p style={{ marginBottom: "6px" }}>
//         Progress: <strong>{completed}</strong> / {total} tasks completed
//       </p>

//       <div
//         style={{
//           width: "100%",
//           height: "12px",
//           background: "#e4e4e4",
//           borderRadius: "8px",
//           overflow: "hidden"
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             width: `${percentage}%`,
//             background: percentage === 100 ? "#4caf50" : "#3b82f6",
//             transition: "0.3s ease",
//           }}
//         ></div>
//       </div>

//       <p style={{ marginTop: "6px", fontSize: "14px" }}>
//         {percentage}% completed
//       </p>
//     </div>
//   );
// };

// export default ProgressBar;


import React from 'react'

const ProgressBar = ({total,completedTasks,percentage}) => {
  
  return (
    <div className='progress-container'>
      <p>Progress : {completedTasks}/{total} completed</p>
      <div className='progress-bar'>
         
          <div className='progress'
          style={{width:`${percentage}%`,backgroundColor:percentage!==100?"blue":"green"}}
          ></div>
      </div>
      <p>{percentage}%</p>
    </div>
  )
}

export default ProgressBar