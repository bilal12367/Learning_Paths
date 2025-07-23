
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get('/', (req, res) => {
    console.log("Received request for root path");
    res.json({ message: 'Welcome to the API Gateway!' });
});

app.post("/register", (req, res) => {
    console.log("Received registration request:", req.body);
    const secret = process.env.JWT_SECRET;
    const key = process.env.JWT_KEY;
    const token = jwt.sign({...req.body, iss: key}, secret, {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRATION
    })
    res.setHeader('Authorization', 'Bearer '+token).status(201).json({ message: "User registered successfully" });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});