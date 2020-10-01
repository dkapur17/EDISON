const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

app.get('/api/about', (req, res) => {
    res.send("I am an Extremely Deligent and Intelligent System of Neurons. But you can just call me Edison.");
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});