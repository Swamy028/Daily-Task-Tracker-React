import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { api } from '../api';


const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState('');
  const [show,setShow]=useState(false);
  const [error,setError]=useState(null);
  const [response,setResponse]=useState("");

  const navigate=useNavigate();

  const handleSubmit = async(e) => {
     e.preventDefault();
    try {
      const res=await api.post('/users/register',{name,email,password})
      setResponse("Registered Successfully")
      setError("");
      setTimeout(()=>navigate('/login'),1000);
    } catch (error) {
      console.log(error)
      setError(error.response.data.msg);
    }
    
  }

  return (
    <div>

      <form  className='form login-form' onSubmit={handleSubmit}>
        <h2>Register page</h2>
        <div className='field'>
          <label htmlFor="">Name</label>
          <input type="text" required placeholder='enter ur name' value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className='field'>
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="Enter email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='field'>
          <label htmlFor="">Password</label>
          <input type={show?'text':'password'} placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='showpassword'>
          <input id="sp" type="checkbox" checked={show} onChange={()=>setShow(p=>!p)}/>
          <label htmlFor="sp">show password</label>
        </div>
        {error&&<p>{error}</p>}
        {response&&<p>{response}</p>}
        <button type='submit'>Register</button>
        <p>if you're already registered?  <Link to='/login'>Login</Link></p>
      </form>
    </div>
  )
}

export default RegisterPage