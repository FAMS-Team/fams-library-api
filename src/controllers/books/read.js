const db = require("../../db/postgres");
const queries = require("../../db/queries_book");

const getBookByID = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(queries.selectBookInnerJoin, [id]);

    if (result.rows.length == 0) {
      return res.status(404).send();
    }

    const book = result.rows[0];
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send();
  }
};

const getBookByIDWithoutBookLink = async (req,res) => {
  const id = req.params.id;

  try{
    const result = await db.query(queries.selectBookInnerJoinWithoutBookLink, [id]);

    if(result.rows.length == 0){
      return res.status(404).send();
    }

    const book = result.rows[0];
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send();
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await db.query(queries.selectAllBooks);
    res.status(200).send(books.rows);
  } catch (err) {
    res.status(500).send();
  }
};

const getBooksWithoutBookLink = async (req,res) => {
  try {
    const books = await db.query(queries.selectAllBooksWithoutBookLink);
    res.status(200).send(books.rows);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = { getBookByID, getBooks,getBookByIDWithoutBookLink,getBooksWithoutBookLink };
