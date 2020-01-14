import React, {useEffect} from 'react';
import { Card, CardContent, CardHeader, Typography, Divider } from '@material-ui/core';
export const ControlPanel = (data) => {
    const defaultObject = {
        applicationType: "---",
        applicationName: "---",
        date: "---",
        ip: "---",
        userAgent: "---"
    };
    const {_lastLoginData, _externalLoginData} = data.data.data;
    const externalLastLogin = _externalLoginData ? JSON.parse(_externalLoginData) : defaultObject;
    const internalLastLogin = _lastLoginData ? JSON.parse(_lastLoginData) : defaultObject;

    return (
        <div>
            <Card>
                <CardHeader title="Control Panel" subheader="You can check your login status here!" />
                <Divider />
                <CardContent>
                    <Typography variant="subtitle2"><b> Application: </b> {internalLastLogin.applicationType} </Typography>
                    <Typography variant="subtitle2"><b> Name: </b> {internalLastLogin.applicationName} </Typography>
                    <Typography variant="subtitle2"><b> Last login date: </b>{internalLastLogin.date}</Typography>
                    <Typography variant="subtitle2"><b> Last login IP: </b>{internalLastLogin.ip}</Typography>
                    <Typography variant="subtitle2"><b> User-Agent: </b> {internalLastLogin.userAgent} </Typography> 
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="subtitle2"><b> Application: </b> {externalLastLogin.applicationType} </Typography>
                    <Typography variant="subtitle2"><b> Name: </b> {externalLastLogin.applicationName} </Typography>
                    <Typography variant="subtitle2"><b> Last login date: </b>{externalLastLogin.date}</Typography>
                    <Typography variant="subtitle2"><b> Last login IP: </b>{externalLastLogin.ip}</Typography>
                    <Typography variant="subtitle2"><b> User-Agent: </b> {externalLastLogin.userAgent} </Typography> 
                </CardContent>
            </Card>
        </div>
    )
}
