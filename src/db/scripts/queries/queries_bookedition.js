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

const selectIDPublisherBook = `
  SELECT id_publisher_book FROM
    publisher_book
    WHERE
    id_book = $1
    AND
    id_publisher = $2
`;

const updateBookEdition = `
	UPDATE bookedition SET
		edition = $1,
		page_number = $2,
		isbn = $3,
		price = $4,
		image_link = $5,
		book_link = $6,
		id_publisher_book = $7
	WHERE id_bookedition = $8
`;

module.exports = {
  insertBookEdition,
  insertBookPublisher,
	selectIDPublisherBook,
	updateBookEdition
};
