import React, { Component } from 'react';
import Router from 'next/router'
import axios from 'axios';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';

const redirect = res => {
    if(res) {
        res.writeHead(302, {Location: '/index'})
        res.end()
        res.finished = true
    } else {
        Router.push('/index')
    }
}

class Profile extends Component {
    static async getInitialProps(ctx) {
        const cookieToken = nextCookie(ctx);
        const token = cookieToken.Authorization;
        let data;
        
        if(!token) redirect(ctx.res);

        const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/authenticate',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => data = res.data).catch(error => {
            redirect(ctx.res);
        });

        return { data : data }
    }

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.data._id
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        Cookies.remove('Authorization');
        Router.push('/index');
    }

    render() {
        return (
            <div>
                <h1>You logged in {this.state.email}!</h1>
                <a name="submit" className="form-submit" onClick={this.logout}>LOGOUT</a>
                <style jsx>
                    {`hi`}
                </style>
            </div>
        )
    }
}

export default Profile