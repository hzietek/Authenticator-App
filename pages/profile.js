import React, { Component } from 'react';
import Router from 'next/router'
import { Dashboard } from '../components/profile/Dashboard';
import axios from 'axios';
import nextCookie from 'next-cookies';
import '../style/login.scss';

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
            method: 'get',
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
    }

    render() {
        return (
            <div>
                <Dashboard data={this.props.data}></Dashboard>
                <style jsx>
                    {`hi`}
                </style>
            </div>
        )
    }
}

export default Profile