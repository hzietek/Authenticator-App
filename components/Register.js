import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';

function RegisterAccept(props) {
    console.log("szajka" , props.registerAccept);
    if (props.registerAccept) {
        console.log(props.registerAccept);
        return <h2 className='register-accept'>YOU ARE REGISTERED NOW!</h2>
    } else {
        return (null);
    }
}

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            registerAccept: false
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
        axios.post('http://localhost:3001/registeruser', `name=${this.state.name}&email=${this.state.email}&password=${this.state.password}`)
        .then(response => {this.setState({registerAccept: true}); console.log("mieszajka", this.state.registerAccept)}).then(error => {console.log(error)});
        this.setState({name: ""});
        this.setState({email: ""});
        this.setState({password: ""});
    }

    render() {
        return (
            <div className="register-container">
                    <form className="form">
                        <h1 className="form-title">NEW USER? YOU CAN REGISTER HERE!</h1>
                        <RegisterAccept registerAccept = {this.state.registerAccept} />
                        <input value={this.state.name} className="form-element" type="text" name="name" placeholder="NAME" onChange={this.handleName}></input>
                        <input value={this.state.email} className="form-element" type="text" name="email" placeholder="EMAIL" onChange={this.handleEmail}></input>
                        <input value={this.state.password} className="form-element" type="password" placeholder="PASSWORD" name="password" onChange={this.handlePassword}></input>
                        <a className="form-submit register" onClick={this.register}>REGISTER</a>
                    </form>
                </div>
        )
    }
}

export default Register;
