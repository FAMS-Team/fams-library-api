const express = require("express");
const db = require("./db/postgres");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get("/", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}; http://localhost:${PORT}/`);
});
