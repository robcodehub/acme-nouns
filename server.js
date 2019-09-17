const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();


app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));



const port = process.env.PORT || 3000;


app.listen(port);
