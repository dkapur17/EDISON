const express = require('express');
const axios = require('axios');

const QnARoutes = require('./routes/QnARoutes');

const app = express();
const port = 5000;

app.use(express.json());

app.use('/qna', QnARoutes);

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});