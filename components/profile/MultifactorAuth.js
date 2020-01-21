import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Switch, CardContent, CardActions, Typography, CardHeader, FormControlLabel, Button } from '@material-ui/core';

export const MultifactorAuth = (data) => {
    const [toggle, setToggle] = useState({
        checked: false,
      });
      
    let isMultifactor;

    useEffect(() => {
        isMultifactor = data.data.data._multifactorAuth ? true : false;
        setToggle({...toggle, ["checked"]: isMultifactor})
    }, [isMultifactor]);

    const handleToggle = event => {
        setToggle({ ...toggle, ["checked"]: event.target.checked });    
    }

    const sendData = () => {
        let multifactorData = toggle.checked ? 1 : 0;
        axios({
            method: 'post',
            url: 'http://localhost:3001/multifactor',
            data: {
                email: data.data.data._id,
                multifactor: multifactorData
            },
            headers: {
                Access: process.env.secretKey
            }
        })
    }

    return (
        <div>
            <Card color="primary">
                <CardHeader
                    title="2-Factor Authentication"
                />
                <CardContent>
                <Typography>You can turn on this option to get additional special code for logging.</Typography>
                </CardContent>
                <CardContent style={{display: 'flex', justifyContent:'center'}}>
                <FormControlLabel control={<Switch checked={toggle.checked} value="toggle" onChange={handleToggle}/>} label={toggle.checked ? "ON" : "OFF"}/>
                <Button color="primary" variant="contained" onClick={sendData}>SAVE</Button>
                </CardContent>
            </Card>
            
        </div>
    )
}

