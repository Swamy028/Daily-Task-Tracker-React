import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext';
import { api } from '../api';

const LoginPage = () => {
  
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [response,setResponse]=useState("");
  const [show,setShow]=useState(false);

  const {login}=useAuthContext();

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const response=await api.post('/users/login',{email,password});
      const user=response.data.user
      const token=response.data.token

      setTimeout(()=>login(user,token),500)
      
      //setTimeout(()=>navigate('/'),2000)
        setResponse("Login success")
      setEmail("")
      setPassword("")
      setError("");
    } catch (error) {
      setError(`error login ${error.response.data.msg}`)
    }
  }

  return (
    <div>

      <form action={handleSubmit} className='form login-form'>
        <h2>Login page</h2>
        <div className='field'>
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="Enter email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className='field' style={{marginBottom:"20px"}}>
          <label htmlFor="">Password</label>
          <input type={show?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className='showpassword'>
          <input id="sp" type="checkbox" checked={show} onChange={()=>setShow(p=>!p)}/>
          <label htmlFor="sp">show password</label>
        </div>
        <button type='submit'>Login</button>
        {error&&<p className='error'>{error}</p>}
        {response&&<p className='res'>{response}</p>}
        <p>if you're not registered yet ?  <Link to='/register'>Register</Link></p>
      </form>

    </div>
  )
}

export default LoginPage