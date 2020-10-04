const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_bookedition");

const updateBookEdition = async (req, res) => {
  const bookEdition = new BookEdition(req.body);
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    try{
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
    }catch(err){
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
  this.bookEditionID = body.book_edition_id;
};

module.exports = updateBookEdition;
