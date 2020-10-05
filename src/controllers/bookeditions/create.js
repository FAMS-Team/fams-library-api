const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_bookedition");

const createBookEdition = async (req,res) => {
  const bookEdition = new BookEdition(req.body);
  bookEdition.bookID = req.params.id_book
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    try{
      let publisherBookID;
      try{
        let result = await db.query(queries.selectIDPublisherBook, [
          bookEdition.bookID,
          bookEdition.publisherID
        ]);
        publisherBookID = result.rows[0].id_publisher_book
    }
    catch(err) {
      let result = await db.query(queries.insertBookPublisher, [
        bookEdition.bookID,
        bookEdition.publisherID
      ]);
      publisherBookID = result.rows[0].id_publisher_book;
    }
      console.log(publisherBookID)
      await db.query(queries.insertBookEdition, [
        bookEdition.edition,
        bookEdition.pageNumber,
        bookEdition.isbn,
        bookEdition.price,
        bookEdition.imageLink,
        bookEdition.bookLink,
        publisherBookID,
      ]);
      res.status(201).send("Success!");
    } catch (err) {
      res.status(400).send(err);
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
