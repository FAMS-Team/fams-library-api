const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/books");
const countryRouter = require("./routes/countries");
const categoryRouter = require("./routes/categories");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/countries", countryRouter);
app.use(bookRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
