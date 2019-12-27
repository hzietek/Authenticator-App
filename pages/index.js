import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import '../style/login.scss';

const Index = () => (
  <div className='container'>
    <div className="title"><h1>AUTHENTICATOR</h1><div className="auth-image"></div></div>
    <div className='login-container'>
      <Login></Login>
      <Register></Register>
    </div>
  </div>
)

export default Index
