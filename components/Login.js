import React, { Component } from 'react';

class Login extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            email: '',
            password: ''
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    } 

    handleSubmit() {
        
    }

    render() {
        return (
            <div>
                <div className="form-container">
                    <form className="form">
                        <input name="email" type="text" value={this.state.email} className="form-element" onChange={this.handleEmail}></input>
                        <input name="password" type="password" value={this.state.password} className="form-element" onChange={this.handlePassword}></input>
                        <a name="submit" className="form-submit" onClick={this.handleSubmit}>SUBMIT</a>
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
                `
                }
                </style>
            </div>
        )
    }
}

export default Login;