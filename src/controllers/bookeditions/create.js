const db = require("../../db/postgres");
const cloudinary = require('cloudinary').v2;
const queries = require("../../db/scripts/queries/queries_bookedition");

const createBookEdition = async (req,res) => {
  const bookEdition = new BookEdition(req.body);
  bookEdition.bookID = req.params.id_book;
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    try{
      await db.query('BEGIN');
      let result = await db.query(queries.selectIDPublisherBook, [
        bookEdition.bookID,
        bookEdition.publisherID
      ]);
      //let publisherBookID = result.rows[0].id_publisher_book
      
      if (result.rowCount === 0){
        result = await db.query(queries.insertBookPublisher, [
          bookEdition.bookID,
          bookEdition.publisherID
        ]);
        publisherBookID = result.rows[0].id_publisher_book;
      }
      
      const image = await cloudinary.uploader.upload(bookEdition.imageLink);
      const book = await cloudinary.uploader.upload(bookEdition.bookLink);
      bookEdition.imageLink = image.secure_url;
      bookEdition.bookLink = book.secure_url;

      await db.query(queries.insertBookEdition, [
        bookEdition.edition,
        bookEdition.pageNumber,
        bookEdition.isbn,
        bookEdition.price,
        bookEdition.imageLink,
        bookEdition.bookLink,
        publisherBookID,
      ]);
      await db.query('COMMIT');
      res.status(201).send({message: "Successfully added edition!"});
    } catch (err) {
      await db.query('ROLLBACK');
      res.status(400).send(err.stack);
    }
  }
};

function BookEdition(body) {
  this.edition = body.edition;
  this.pageNumber = body.page_number;
  this.isbn = body.isbn;
  this.price = body.price;
  this.imageLink = body.image_link;
  this.bookLink = body.book_link;
  this.publisherID = body.publisher_id;
  this.bookID = body.book_id;
};

module.exports = createBookEdition;
