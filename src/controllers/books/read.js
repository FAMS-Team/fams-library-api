const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_book");

const getBookByID = async (req, res) => {
  const id = req.params.id;

  try {
    let result = await db.query(queries.selectBookInnerJoin, [id]);

    if (result.rows.length == 0) {
      return res.status(404).send();
    }

    const book = result.rows[0];

    result = await db.query(queries.selectAllBookAuthor,[id]);

    const selectedBooks = []
    selectedBooks.push({
      category: book.category,
      subcategory: book.subcategory,
      series: book.series,
      title: book.title,
      subtitle: book.subtitle,
      publication_date: book.publication_date,
      description: book.description,
      authors: result.rows
    });

    res.status(200).send(selectedBooks);
  } catch (err) {
    res.status(500).send();
  }
};

const getBooks = async (req, res) => {
  try {
    let {title, author, series} = req.query;
    let books;
    if (title) {
      title = `%${title}%`;
      books = await db.query(queries.searchBooksByTitle, [title]);
    }
    else if(author){
      author = `%${author}%`;
      books = await db.query(queries.searchBooksByAuthor, [author]);
    }
    else if(series){
      series = `%${series}%`;
      books = await db.query(queries.searchBooksBySeries, [series]);
    }
    else{
      books = await db.query(queries.selectAllBooks);
    }

    const selectedBooks = [];
    for (const bookSelected of books.rows){
      const result = await db.query(queries.selectAllBookAuthor,[bookSelected.id_book]);

      selectedBooks.push({
        id_book: bookSelected.id_book,
        category: bookSelected.category,
        subcategory: bookSelected.subcategory,
        series: bookSelected.series,
        title: bookSelected.title,
        subtitle: bookSelected.subtitle,
        publication_date: bookSelected.publication_date,
        description: bookSelected.description,
        authors: result.rows
      });
    }
    res.status(200).send(selectedBooks);
  } catch (err) {
    res.status(500).send();
  }
};

const searchBooks = async (req, res) => {
  let {title, author, series} = req.body;
  title = `%${title}%`;
  author = `%${author}%`;
  series = `%${series}%`;
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
