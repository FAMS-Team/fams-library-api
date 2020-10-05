const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_reservation");
const date = require("../../db/scripts/queries/queries_date");

const createReservation = async (req, res) => {
  const reservation = new Reservation(req.body);
  const {user} = req;
  reservation.id_contact = user.id_contact;
  const taxes = 0.03;
  try{
    let result = await db.query(date.selectDateNow);
    const dateNow = result.rows[0].now;

    result = await db.query(queries.insertReservation, [
      reservation.id_contact,
      dateNow,
      reservation.end_date,
      dateNow
    ]);

    const reservationID = result.rows[0].id_reservation;
    result = await db.query(queries.selectPriceFromBookEdition, [
      reservation.id_bookedition
    ]);
    const price = result.rows[0].price
    tprice = price.replace('$','')
    result = await db.query(date.selectDate,[reservation.end_date]);
    date = result.rows[0].to_date;
    result = await db.query(date.selectDifferenceBetweenTwoDates,[
      date,
      dateNow
    ]);
    const dateDifference = result.rows[0].date_part;
    const priceDays = tprice*dateDifference;
    const tax = priceDays*taxes;
    const totalPrice = tax + priceDays;
    await db.query(queries.insertReservationDetail, [
      reservation.id_bookedition,
       reservationID,
       reservation.id_paymentmethod,
       tax,
       totalPrice
     ]);
     res.status(200).send({message: "Reservation successful!"});
  } catch (err) {
    res.status(400).send(err);
  }
};

function Reservation(body) {
  this.id_contact = body.id_contact;
  this.end_date = body.end_date;
  this.id_bookedition = body.id_bookedition;
  this.id_paymentmethod = body.id_paymentmethod;
};

module.exports = createReservation;
