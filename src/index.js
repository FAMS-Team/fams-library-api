const express = require("express");
const jwt = require('jsonwebtoken');
const db = require("./db/postgres");
const util = require('./routes/util');
const user = require('./routes/user');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', util);
app.use('/user', user);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}; http://localhost:${PORT}/`);
});
