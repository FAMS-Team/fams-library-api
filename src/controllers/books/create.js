const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_book");

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
      const authorID = book.authorID;
      for (let i = 0; i < authorID.length; i++)
      {
        await db.query(queries.insertBookAuthor, [authorID[i], bookID]);
      }
      res.status(201).send({message: "Book created successfully!"});
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
}

module.exports = createBook;
