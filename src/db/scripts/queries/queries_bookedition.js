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

const deleteBookEditionByID = `
	DELETE FROM bookedition WHERE id_bookedition = $1 RETURNING id_publisher_book
`;

const selectBookPublisherInBookEdition = `
	SELECT id_publisher_book
		FROM bookedition
		WHERE id_bookedition = $1
`;

const selectBookPublisherByID = `
	SELECT COUNT(id_publisher_book)
		FROM bookedition GROUP BY id_publisher_book
		HAVING id_publisher_book = $1
`;

const deleteBookPublisherByID = `
	DELETE FROM publisher_book WHERE id_publisher_book = $1
`;

const selectBookEdition = `
	SELECT
		BE.ID_BookEdition AS ID, B.title, B.subtitle, B.description, B.publication_date, BSC.name AS Subcategory, BC.name AS Category,
		S.name AS Series, A.name Author_name, A.last_name AS Author_LastName, P.name AS Publisher, BE.edition,
		BE.page_number, BE.isbn, BE.price,
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
		WHERE BE.ID_BookEdition = $1
`;

const selectBookEditionWithoutBookLink = `
	SELECT
		BE.ID_BookEdition AS ID, B.title, B.subtitle, B.description, B.publication_date, BSC.name AS Subcategory, BC.name AS Category,
		S.name AS Series, A.name Author_name, A.last_name AS Author_LastName, P.name AS Publisher, BE.edition,
		BE.page_number, BE.isbn, BE.price,
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
		WHERE BE.ID_BookEdition = $1
`;

const selectBookEditionsByBookID = `
	SELECT BE.ID_BookEdition, BE.Edition, P.Name FROM Book AS B
	INNER JOIN Publisher_Book AS PB
	ON PB.ID_Book = B.ID_Book
	INNER JOIN Publisher AS P
	ON P.ID_Publisher = PB.ID_Publisher
	INNER JOIN BookEdition AS BE
	ON PB.ID_Publisher_Book = BE.ID_Publisher_Book
	WHERE B.ID_Book = $1
`
const updateEdition = `
	UPDATE bookedition SET edition = $1
	WHERE id_bookedition = $2
`;

const updatePageNumber = `
	UPDATE bookedition SET page_number = $1
	WHERE id_bookedition = $2
`;

const updateIsbn = `
	UPDATE bookedition SET isbn = $1
	WHERE id_bookedition = $2
`;

const updatePrice = `
	UPDATE bookedition SET price = $1
	WHERE id_bookedition = $2
`;

const updateImageLink = `
	UPDATE bookedition SET image_link = $1
	WHERE id_bookedition = $2
`;

const updateBookLink = `
	UPDATE bookedition SET book_link = $1
	WHERE id_bookedition = $2
`;

const updatePublisherId = `
	UPDATE bookedition SET id_publisher_book = $1
	WHERE id_bookedition = $2
`;

module.exports = {
  insertBookEdition,
  insertBookPublisher,
	selectIDPublisherBook,
	updateBookEdition,
	deleteBookEditionByID,
	selectBookPublisherByID,
	selectBookPublisherInBookEdition,
	deleteBookPublisherByID,
	selectBookEdition,
	selectBookEditionsByBookID,
	selectBookEditionWithoutBookLink,
	updateEdition,
	updatePageNumber,
	updateIsbn,
	updatePrice,
	updateImageLink,
	updateBookLink,
	updatePublisherId
};
