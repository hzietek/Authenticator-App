import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.register = this.register.bind(this);
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    } 

    handleName(e) {
        this.setState({name: e.target.value});
    }

    register() {
        
    }

    render() {
        return (
            <div>
                <div className="register-container">
                    <form className="register-form">
                        <input value={this.state.name} className="form-element" type="text" name="name" onChange={this.handleName}></input>
                        <input value={this.state.email} className="form-element" type="text" name="email" onChange={this.handleEmail}></input>
                        <input value={this.state.password} className="form-element" type="password" name="password" onChange={this.handlePassword}></input>
                        <a className="form-submit">REGISTER</a>
                    </form>
                </div>
                <style jsx>
                {`
                    .register-container {
                        margin-top: 100px;
                        display: flex;
                        justify-content: center;
                    }
                    .register-form {
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
                        background-color: blue;
                    }
                `
                }
                </style>
            </div>
        )
    }
}

export default Register;
