const insertBook = `
	INSERT INTO 
		book (id_booksubcategory,id_series,title,subtitle,publication_date,description) 
	VALUES 
		($1,$2,$3,$4,$5,$6)
	RETURNING id_book;
	`;

const insertBookAuthor = `
	INSERT INTO 
		book_author (id_author, id_book)
	VALUES
		($1, $2);
`;

const insertBookPublisher = `
	INSERT INTO
		publisher_book (id_publisher, id_book)
	VALUES
		($1, $2)
	RETURNING id_publisher_book;
`;

const insertBookEdition = `
	INSERT INTO 
		bookedition (id_publisher_book, edition, page_number, isbn, price, image_link, book_link)
	VALUES
		($1, $2, $3, $4, $5, $6, $7);
`;

module.exports = {
  insertBook,
  insertBookAuthor,
  insertBookPublisher,
  insertBookEdition,
};
