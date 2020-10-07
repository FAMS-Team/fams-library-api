const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_bookedition");

const updateBookEdition = async (req, res) => {
  const bookEdition = new BookEdition(req.body);
  bookEdition.bookEditionID = req.params.id_edition;
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    try{
      await db.query("BEGIN");

      if (bookEdition.edition) {
          await db.query(queries.updateEdition,[bookEdition.edition, bookEdition.bookEditionID]);
      }
      if (bookEdition.pageNumber) {
          await db.query(queries.updatePageNumber,[bookEdition.pageNumber, bookEdition.bookEditionID]);
      }
      if (bookEdition.isbn) {
          await db.query(queries.updateIsbn,[bookEdition.isbn, bookEdition.bookEditionID]);
      }
      if (bookEdition.price) {
          await db.query(queries.updatePrice,[bookEdition.price, bookEdition.bookEditionID]);
      }
      if (bookEdition.imageLink) {
          await db.query(queries.updateImageLink,[bookEdition.imageLink, bookEdition.bookEditionID]);
      }
      if (bookEdition.bookLink) {
          await db.query(queries.updateBookLink,[bookEdition.bookLink, bookEdition.bookEditionID]);
      }
      if (bookEdition.publisherID) {
          await db.query(queries.updatePublisherId,[bookEdition.publisherID, bookEdition.bookEditionID]);
      }

      await db.query("COMMIT");
      /*
      await db.query(queries.updateBookEdition,[
        bookEdition.edition,
        bookEdition.pageNumber,
        bookEdition.isbn,
        bookEdition.price,
        bookEdition.imageLink,
        bookEdition.bookLink,
        bookEdition.publisherID,
        bookEdition.bookEditionID
      ]);
      res.status(201).send("Success!");
      */
      return res.status(200).send({message: "EditionBook updated successfully."})
    }catch(err){
      await db.query("ROLLBACK")
      return res.status(500).send(err);
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
  this.publisherID = body.publisher;
  this.bookEditionID = body.book_edition_id;
};

module.exports = updateBookEdition;
