import React, {useEffect} from 'react';
import { Card, CardContent, CardHeader, Typography, Divider } from '@material-ui/core';
export const ControlPanel = (data) => {
    const {_lastLoginDate, _externalLoginData} = data.data.data;
    const externalLastLogin = JSON.parse(_externalLoginData);

    return (
        <div>
            <Card>
                <CardHeader title="Control Panel" subheader="You can check your login status here!" />
                <Divider />
                <CardContent>
                    <Typography variant="subtitle2"><b> Application: </b> INTERNAL </Typography>
                    <Typography variant="subtitle2"><b> Last login date: </b>{_lastLoginDate}</Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="subtitle2"><b> Application: </b> {externalLastLogin.applicationType} </Typography>
                    <Typography variant="subtitle2"><b> Name: </b> {externalLastLogin.applicationName} </Typography>
                    <Typography variant="subtitle2"><b> Last login date: </b>{externalLastLogin.date}</Typography>
                    <Typography variant="subtitle2"><b> Last Login IP: </b>{externalLastLogin.ip}</Typography>
                    <Typography variant="subtitle2"><b> User-Agent: </b> {externalLastLogin.userAgent} </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
