const db = require("../../db/postgres");
const queries = require("../../db/queries/book");

const createBook = async (req, res) => {
  const book = {
    title: req.body.title,
    subTitle: req.body.sub_title,
    description: req.body.description,
    publicationDate: req.body.publication_date,
    seriesID: req.body.series_id,
    categoryID: req.body.category_id,
    subCategoryID: req.body.sub_category_id,
    authorID: req.body.author_id,
    publisherID: req.body.publisher_id,
    edition: req.body.edition,
    pageNumber: req.body.page_number,
    isbn: req.body.isbn,
    price: req.body.price,
    imageLink: req.body.image_link,
    bookLink: req.body.book_link,
  };

  try {
    const data = [
      book.subCategoryID,
      book.seriesID,
      book.title,
      book.subTitle,
      book.publicationDate,
      book.description,
    ];
    console.log(data);
    const results = await db.query(queries.insertBook, data);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

module.exports = createBook;
