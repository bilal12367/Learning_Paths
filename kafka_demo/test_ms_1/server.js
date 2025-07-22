const express = require('express');

const app = express();

app.use(express.json());

app.post('/auth/register', (req, res) => {
    console.log("Register Endpoint Hit!");
    console.log("Request Body: ", req.body);
    console.log("Request Headers: ", req.headers);
    res.json({ message: "Registration Successful!" });
});

app.use((req, res) => {
    console.log("Fallback Endpoint Hit!");
    console.log("Request URL: ", req.originalUrl);
    console.log("Request Body: ", req.body);
    console.log("Request Headers: ", req.headers);
    res.status(404).json({ message: "Endpoint not found!" });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});