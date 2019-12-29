import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';

function LoginError(props) {
    if (props.loginError) {
        return <h2 className='error'>{props.errorText}</h2>
    } else {
        return (null);
    }
}
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginError: false,
            errorText: ''
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.Authentication = this.Authentication.bind(this);
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    } 

    Authentication() {
        axios.post(`http://localhost:3001/login`, {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if(res.data.login) {
                Cookies.set('Authorization', res.data.token);
                Router.push('/profile');
            } else {
                this.setState({loginError: true, errorText: res.data.text});
            }
        })
    }



    render() {
        return (
            <div>
                <div className="form-container">
                    <form className="form">
                        <h1 className="form-title">SIGN IN</h1>
                        <LoginError loginError = {this.state.loginError} errorText={this.state.errorText}/>
                        <input name="email" type="text" value={this.state.email} className="form-element" placeholder="EMAIL" onChange={this.handleEmail}></input>
                        <input name="password" type="password" value={this.state.password} className="form-element" placeholder="PASSWORD" onChange={this.handlePassword}></input>
                        <a name="submit" className="form-submit login" onClick={this.Authentication}>SUBMIT</a>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;