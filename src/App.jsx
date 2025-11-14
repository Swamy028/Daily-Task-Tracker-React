import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProtectedRooute from './components/ProtectedRooute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PublicRouter from './components/PublicRouter'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRooute><Dashboard/></ProtectedRooute>}/>
      <Route path='/login' element={<PublicRouter><LoginPage/></PublicRouter>} />
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
    </>
  )
}

export default App