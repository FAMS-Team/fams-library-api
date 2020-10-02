const db = require("../../db/postgres");
const queries = require("../../db/queries")

const deleteBookByID = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
  await db.query(queries.deleteBookEdition, [id]);

  await db.query(queries.deletePublisherBook,[id]);

  await db.query(queries.deleteBookAuthor,[id]);

  await db.query(queries.deleteBook,[id]);
  res.status(200).send();
} catch(err) {
  console.log(err);
  res.status(500).send(err);
}
};

module.exports = deleteBookByID
