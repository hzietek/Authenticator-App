import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';

function LoginError(props) {
    if (props.loginError) {
        return <h2 className='error'>Wrong credentials!</h2>
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
            loginError: false
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
        axios.get(`http://localhost:3001/getusers`).then(res => {
            const users = res.data;
            users.forEach(element => {
                if (this.state.email === element.email && this.state.password === element.password) {
                    Router.push('/profile');
                } else {
                    this.setState({loginError: true});
                }
            }); 
            
        }).catch(error => {
            console.log(error);
        });
    }



    render() {
        return (
            <div>
                <div className="form-container">
                    <form className="form">
                        <LoginError loginError = {this.state.loginError} />
                        <input name="email" type="text" value={this.state.email} className="form-element" onChange={this.handleEmail}></input>
                        <input name="password" type="password" value={this.state.password} className="form-element" onChange={this.handlePassword}></input>
                        <a name="submit" className="form-submit" onClick={this.Authentication}>SUBMIT</a>
                    </form>
                </div>
                <style jsx>
                {`
                    .form-container {
                        display: flex;
                        justify-content: center;
                    }
                    .form {
                        display: flex;
                        flex-direction: column;
                    }
                    .form-element {
                        margin-bottom: 20px;
                        height: 20px;
                        width: 200px;
                        color: red;
                    }
                    .form-submit {
                        cursor: pointer;
                        text-align: center;
                        border: 1px solid black;
                        background-color: yellow;
                    }
                    .error {
                        color: red;
                    }
                `
                }
                </style>
            </div>
        )
    }
}

export default Login;