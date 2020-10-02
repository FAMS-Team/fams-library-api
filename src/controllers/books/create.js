const db = require("../../db/postgres");
const queries = require("../../db/queries");

const createBook = async (req, res) => {
  const book = new Book(req.body);
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    try {
      let result = await db.query(queries.insertBook, [
        book.subCategoryID,
        book.seriesID,
        book.title,
        book.subTitle,
        book.publicationDate,
        book.description,
      ]);

      const bookID = result.rows[0].id_book;

      await db.query(queries.insertBookAuthor, [book.authorID, bookID]);

      result = await db.query(queries.insertBookPublisher, [
        bookID,
        book.publisherID,
      ]);

      const publisherBookID = result.rows[0].id_publisher_book;

      await db.query(queries.insertBookEdition, [
        book.edition,
        book.pageNumber,
        book.isbn,
        book.price,
        book.imageLink,
        book.bookLink,
        publisherBookID,
      ]);

      res.status(201).send();
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

function Book(body) {
  this.title = body.title;
  this.subTitle = body.sub_title;
  this.description = body.description;
  this.publicationDate = body.publication_date;
  this.seriesID = body.series_id;
  this.categoryID = body.category_id;
  this.subCategoryID = body.sub_category_id;
  this.authorID = body.author_id;
  this.publisherID = body.publisher_id;
  this.edition = body.edition;
  this.pageNumber = body.page_number;
  this.isbn = body.isbn;
  this.price = body.price;
  this.imageLink = body.image_link;
  this.bookLink = body.book_link;
}

module.exports = createBook;
