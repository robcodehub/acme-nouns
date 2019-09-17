const app = require('express').Router();
const db = require('./db');

app.get('/persons', async(req, res, next) => {
  try {
    res.send( await db.models.Person.findAll());
  }
  catch(ex) {
    next(ex);
  }
});



module.exports = app;
