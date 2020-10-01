const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/books");
const countryRouter = require("./routes/countries");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/country", countryRouter);
app.use("/book", bookRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
