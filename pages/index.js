import React, { Component } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import Router from 'next/router';
import Cookies from 'js-cookie';
import '../style/login.scss';

class Index extends Component {
  componentWillMount() {
    const token = Cookies.get('Authorization');
    if(token) Router.push('/profile');
  }

  render() {
    return (
    <div className='container'>
      <div className="title"><h1>AUTHENTICATOR</h1><div className="auth-image"></div></div>
      <div className='login-container'>
        <Login></Login>
        <Register></Register>
      </div>
    </div>
    )
  }
}

export default Index
