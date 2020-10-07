const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_book");

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

const getBooks = async (req, res) => {
  try {
    const books = await db.query(queries.selectAllBooks);
    res.status(200).send(books.rows);
  } catch (err) {
    res.status(500).send();
  }
};

const searchBooks = async (req, res) => {
  const {title, author, series} = req.body;
  let books;
  try{
    if (title) {
      books = await db.query(queries.searchBooksByTitle, [title]);
    }
    else if(author){
      books = await db.query(queries.searchBooksByAuthor, [author]);
    }
    else if(series){
      books = await db.query(queries.searchBooksBySeries, [series]);
    }
    res.status(200).send(books.rows)
  }
  catch (error) {
    return res.status(400).send(error);
  }
};
/*
const getEditionBooksWithoutBookLink = async (req,res) => {
  try {
    const id = req.params.id;
    const books = await db.query(queries.selectAllEditionBooksWithoutBookLink,[id]);
    res.status(200).send(books.rows);
  } catch (err) {
    res.status(500).send();
  }
};
*/

module.exports = { getBookByID, getBooks, searchBooks};
