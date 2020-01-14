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
            errorText: '',
            addAuth: false,
            code: '',
            secret: ''
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.Authentication = this.Authentication.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.CodeAuthentication = this.CodeAuthentication.bind(this);
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    } 

    handleCode(e) {
        this.setState({code: e.target.value});
    }

    Authentication() {
        axios.post(`http://localhost:3001/login`, {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            console.log(res.data);
            if(res.data.login && !res.data.code) {
                Cookies.set('Authorization', res.data.token);
                Router.push('/profile');
            } else if (res.data.login && res.data.code) {
                console.log(res.data);
                this.setState({addAuth: true, secret: res.data.secret});
            } else {
                this.setState({loginError: true, errorText: res.data.text});
            }
        })
    }

    CodeAuthentication() {
        if(this.code === this.secret) {
            axios.post(`http://localhost:3001/codeauth`, {
                email: this.state.email,
                code: this.state.code,
                secret: this.state.secret
            }).then(res => {
                Cookies.set('Authorization', res.data.token);
                Router.push('/profile');
            }).catch(err => console.log(err));
        }
    }


    render() {
        return (
            <div>
                <div className="form-container">
                    <form className="form">
                        <h1 className="form-title">SIGN IN</h1>
                        {this.state.addAuth ? <h4 className='register-accept' style={{ color: '#000000' }}>ADDITIONAL CODE HAS BEEN SENT TO YOUR EMAIL. ENTER IT BELOW.</h4> : null}
                        <LoginError loginError = {this.state.loginError} errorText={this.state.errorText}/>
                        <input name="email" type="text" value={this.state.email} className="form-element" placeholder="EMAIL" onChange={this.handleEmail}></input>
                        <input name="password" type="password" value={this.state.password} className="form-element" placeholder="PASSWORD" onChange={this.handlePassword}></input>
                        {this.state.addAuth ? <input placeholder="CODE" name="2-factor-auth" className="form-element" type="text" value={this.state.code} onChange={this.handleCode}></input> : null}
                        {this.state.addAuth ? <a name="submit" className="form-submit login" onClick={this.CodeAuthentication}>ACCEPT CODE</a> : <a name="submit" className="form-submit login" onClick={this.Authentication}>SUBMIT</a>}
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;