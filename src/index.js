const express = require("express");
const jwt = require('jsonwebtoken');
const db = require("./db/postgres");


const app = express();
const PORT = process.env.PORT || 3000;

const util = require('./routes/util');

app.use('/', util);

app.get("/fams", async (req, res) => {
  try {
    const results = await db.query("SELECT 1");
    res.status(200).send({
      title: "Hello World",
      Rows: results.rows[0]
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/fams/login', (req, res) =>{
  const user = {
    id: 1,
    email: 'john@example.com',
    password: '123456789',
  }

  jwt.sign({user : user}, process.env.SECRET_KEY, (err, token) => {
    res.json({
      token,
    });
  })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}; http://localhost:${PORT}/`);
});
