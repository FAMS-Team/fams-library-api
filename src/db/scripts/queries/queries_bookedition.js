const insertBookEdition = `
	INSERT INTO
		bookedition (edition, page_number, isbn, price, image_link, book_link, id_publisher_book)
	VALUES
		($1, $2, $3, $4, $5, $6, $7);
`;

const insertBookPublisher = `
	INSERT INTO
		publisher_book (id_book, id_publisher)
	VALUES
		($1, $2)
	RETURNING id_publisher_book;
`;

module.exports = {
  insertBookEdition,
  insertBookPublisher
};
