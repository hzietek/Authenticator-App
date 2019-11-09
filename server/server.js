const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.listen(port, () => console.log(`Authentication Server is set on http://localhost:${port}`));

app.get('/api/users', (req, res, next) => {
    const users = [
        {id: 1, email: "test@gmail.com", password: "test123" }
    ];
    
    res.json(users);
});