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

const selectBookInnerJoin = `
	SELECT
		B.title, B.subtitle, B.description, B.publication_date, BSC.name, BC.name, S.name,
		A.name, A.last_name, P.name, BE.edition, BE.page_number, BE.isbn, BE.price,
		BE.image_link, BE.book_link
	FROM
		book AS B
		INNER JOIN booksubcategory AS BSC
			ON BSC.id_booksubcategory = B.id_booksubcategory
		INNER JOIN bookcategory AS BC
			ON BC.id_bookcategory = BSC.id_booksubcategory
		INNER JOIN series AS S
			ON B.id_series = S.id_series
		INNER JOIN book_author AS BA
			ON BA.id_book = B.id_book
		INNER JOIN author AS A
			ON A.id_author = BA.id_author
		INNER JOIN publisher_book AS PB
			ON PB.id_book = B.id_book
		INNER JOIN publisher AS P
			ON P.id_publisher = PB.id_publisher
		INNER JOIN bookedition AS BE
			ON BE.id_publisher_book = PB.id_publisher_book
		WHERE B.id_book = $1;
`;

const selectBookInnerJoinWithoutBookLink = `
	SELECT
		B.title, B.subtitle, B.description, B.publication_date, BSC.name, BC.name, S.name,
		A.name, A.last_name, P.name, BE.edition, BE.page_number, BE.isbn, BE.price,
		BE.image_link
	FROM
		book AS B
		INNER JOIN booksubcategory AS BSC
			ON BSC.id_booksubcategory = B.id_booksubcategory
		INNER JOIN bookcategory AS BC
			ON BC.id_bookcategory = BSC.id_booksubcategory
		INNER JOIN series AS S
			ON B.id_series = S.id_series
		INNER JOIN book_author AS BA
			ON BA.id_book = B.id_book
		INNER JOIN author AS A
			ON A.id_author = BA.id_author
		INNER JOIN publisher_book AS PB
			ON PB.id_book = B.id_book
		INNER JOIN publisher AS P
			ON P.id_publisher = PB.id_publisher
		INNER JOIN bookedition AS BE
			ON BE.id_publisher_book = PB.id_publisher_book
		WHERE B.id_book = $1;
`;

const selectAllBooks = `
	SELECT
		B.title, B.subtitle, B.description, B.publication_date, BSC.name, BC.name, S.name,
		A.name, A.last_name, P.name, BE.edition, BE.page_number, BE.isbn, BE.price,
		BE.image_link, BE.book_link
	FROM
		book AS B
		INNER JOIN booksubcategory AS BSC
			ON BSC.id_booksubcategory = B.id_booksubcategory
		INNER JOIN bookcategory AS BC
			ON BC.id_bookcategory = BSC.id_booksubcategory
		INNER JOIN series AS S
			ON B.id_series = S.id_series
		INNER JOIN book_author AS BA
			ON BA.id_book = B.id_book
		INNER JOIN author AS A
			ON A.id_author = BA.id_author
		INNER JOIN publisher_book AS PB
			ON PB.id_book = B.id_book
		INNER JOIN publisher AS P
			ON P.id_publisher = PB.id_publisher
		INNER JOIN bookedition AS BE
			ON BE.id_publisher_book = PB.id_publisher_book;
`;

const selectAllBooksWithoutBookLink = `
	SELECT
		B.title, B.subtitle, B.description, B.publication_date, BSC.name, BC.name, S.name,
		A.name, A.last_name, P.name, BE.edition, BE.page_number, BE.isbn, BE.price,
		BE.image_link, BE.book_link
	FROM
		book AS B
		INNER JOIN booksubcategory AS BSC
			ON BSC.id_booksubcategory = B.id_booksubcategory
		INNER JOIN bookcategory AS BC
			ON BC.id_bookcategory = BSC.id_booksubcategory
		INNER JOIN series AS S
			ON B.id_series = S.id_series
		INNER JOIN book_author AS BA
			ON BA.id_book = B.id_book
		INNER JOIN author AS A
			ON A.id_author = BA.id_author
		INNER JOIN publisher_book AS PB
			ON PB.id_book = B.id_book
		INNER JOIN publisher AS P
			ON P.id_publisher = PB.id_publisher
		INNER JOIN bookedition AS BE
			ON BE.id_publisher_book = PB.id_publisher_book;
`;

const deleteBookEdition = `
	DELETE FROM bookedition WHERE id_publisher_book IN
		(SELECT id_publisher_book FROM publisher_book WHERE id_book = $1)
`;

const deletePublisherBook = `
	DELETE FROM publisher_book WHERE id_book = $1
`;

const deleteBookAuthor = `
	DELETE FROM book_author WHERE id_book = $1
`;

const deleteBook = `
	DELETE FROM book WHERE id_book = $1
`;

const updateBook = `
	UPDATE book SET
		id_booksubcategory = $1,
		id_series = $2,
		title = $3,
		subtitle = $4,
		publication_date = $5,
		description = $6
	WHERE id_book = $7
`;

module.exports = {
	insertBook,
	insertBookAuthor,
	selectBookInnerJoin,
	selectAllBooks,
	deleteBookEdition,
	deletePublisherBook,
	deleteBookAuthor,
	deleteBook,
	selectAllBooksWithoutBookLink,
	selectBookInnerJoinWithoutBookLink,
	updateBook
};
