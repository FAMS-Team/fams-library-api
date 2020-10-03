const express = require("express");
const bodyParser = require("body-parser");

// Routers
const userRouter = require("./routes/user");
const bookRouter = require("./routes/books");
const countryRouter = require("./routes/countries");
const categoryRouter = require("./routes/categories");
const paymentRouter = require("./routes/payments");
const reservationRouter = require("./routes/reservations");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(countryRouter);
app.use(bookRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(paymentRouter);
app.use(reservationRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
