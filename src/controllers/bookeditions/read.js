const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_bookedition");
const reservation_query = require("../../db/scripts/queries/queries_reservation");
const date_query = require("../../db/scripts/queries/queries_date");

const getBookEdition = async (req, res) => {
  const edition = req.params.id_edition;
  const {user} = req;
  let query = queries.selectBookEditionWithoutBookLink;
  try{
    const reservations = await db.query(reservation_query.selectReservationByUserAndBookEdition,[user.id_contact, edition]);
    if(reservations.rowCount === 0){
      query = queries.selectBookEditionWithoutBookLink;
    }
    else if (reservations.rows[0].end_date >= await db.query(date_query.selectCurrentDate).rows[0].current_date){
      query = queries.selectBookEdition;
    }

    const result = await db.query(query, [edition]);
    const book = result.rows[0];
    res.status(200).send(book);
  }catch(err) {
    res.status(500).send(err);
  }
};

const getAllBookEditions = async (req, res) => {
  const book = req.params.id_book;
  try{
    const result = await db.query(queries.selectBookEditionsByBookID, [book]);
    res.status(200).send(result.rows);
  } catch (error){
    res.status(400).send(error);
  }
}

module.exports = {getBookEdition, getAllBookEditions}
