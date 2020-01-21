require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.APP_PORT;

const createdb = require('./requests/createdb');
const createtable = require('./requests/createtable');
const registeruser = require('./requests/registerUser');
const loginUser = require('./requests/loginUser');
const authentication = require('./utils/authentication/authentication');
const changeMultifactor = require('./requests/changeMultifactor');
const changeDate = require('./requests/changeDate');
const codeAuthentication = require('./requests/codeAuthentication');
const serverApprover = require('./utils/serverApprover');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Authentication Server is set on http://localhost:${port}`));

app.get('/createdb', serverApprover, createdb);
app.get('/createtable', serverApprover, createtable);
app.get('/authenticate', authentication);
app.post('/registeruser', registeruser);
app.post('/login', loginUser);
app.post('/multifactor', serverApprover, changeMultifactor);
app.post('/changedate', serverApprover, changeDate);
app.post('/codeauth', codeAuthentication);
