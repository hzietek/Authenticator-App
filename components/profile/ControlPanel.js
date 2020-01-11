import React, {useEffect} from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
export const ControlPanel = (data) => {
    useEffect(() => {
        console.log("ad",data);
    })

    return (
        <div>
            <Card>
                <CardHeader title="Control Panel" subheader="You can check your login status here!" />
                <CardContent>
                    <Typography variant="subtitle2"><b> Your last login date: </b>{data.data.data._lastLoginDate}</Typography>
                    <Typography variant="subtitle2"><b> Application: </b> EXTERNAL </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
