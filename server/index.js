const express = require('express');
const cors = require('cors');
const port = 3001;

const createdb = require('./requests/createdb');
const createtable = require('./requests/createtable');

const app = express();
app.use(cors());

app.listen(port, () => console.log(`Authentication Server is set on http://localhost:${port}`));

app.get('/createdb', createdb);
app.get('/createtable', createtable);