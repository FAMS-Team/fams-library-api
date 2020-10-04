const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_book");

const updateBook = async (req, res) => {
  const book = new Book(req.body);
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    try{
      await db.query(queries.updateBook,[
        book.subCategoryID,
        book.seriesID,
        book.title,
        book.subTitle,
        book.publicationDate,
        book.description,
        book.bookID
      ]);
      res.status(201).send("Success!");
    }catch(err){
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
  this.subCategoryID = body.sub_category_id;
  this.bookID = body.book_id;
};

module.exports = updateBook;
