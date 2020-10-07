const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_book");

const updateBook = async (req, res) => {
  const book = new Book(req.body);
  const type = req.user.id_contacttype;
  book.bookID = req.params.id;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    try{
      await db.query("BEGIN");

      if (book.subCategoryID) {
          await db.query(queries.updateSubCategoryID,[book.subCategoryID, book.bookID]);
      }
      if (book.seriesID) {
        await db.query(queries.updateSeriesID, [book.seriesID, book.bookID]);
      }
      if (book.title) {
        await db.query(queries.updateTitle, [book.title, book.bookID]);
      }
      if (book.subTitle) {
        await db.query(queries.updateSubTitle, [book.subTitle, book.bookID]);
      }
      if (book.publicationDate) {
        await db.query(queries.updatePublicationDate, [book.publicationDate, book.bookID]);
      }
      if (book.description) {
        await db.query(queries.updateDescription, [book.description, book.bookID]);
      }

      await db.query("COMMIT");
      /*
      await db.query(queries.updateBook,[
        book.subCategoryID,
        book.seriesID,
        book.title,
        book.subTitle,
        book.publicationDate,
        book.description,
        book.bookID
      ]);
      res.status(201).send({message: "Book updated successfully!"});
      */
      return res.status(200).send({message: "Book updated successfully."})
    }catch(err){
      await db.query("ROLLBACK");
      return res.status(500).send(err);
    }
  }
};

function Book(body) {
  this.title = body.title;
  this.subTitle = body.subtitle;
  this.description = body.description;
  this.publicationDate = body.publication_date;
  this.seriesID = body.series;
  this.subCategoryID = body.subcategory;
  this.bookID = body.book_id;
};

module.exports = updateBook;
