const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

const createdb = require('./requests/createdb');
const createtable = require('./requests/createtable');
const registeruser = require('./requests/registerUser');
const getUser = require('./requests/getUser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Authentication Server is set on http://localhost:${port}`));

app.get('/createdb', createdb);
app.get('/createtable', createtable);
app.get('/getusers', getUser);
app.post('/registeruser', registeruser);
