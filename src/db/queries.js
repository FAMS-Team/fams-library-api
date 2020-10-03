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
		publisher_book (id_book, id_publisher)
	VALUES
		($1, $2)
	RETURNING id_publisher_book;
`;

const insertBookEdition = `
	INSERT INTO
		bookedition (edition, page_number, isbn, price, image_link, book_link, id_publisher_book)
	VALUES
		($1, $2, $3, $4, $5, $6, $7);
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

const selectAllCategories = `
	SELECT C.Name AS Category, S.ID_BookSubcategory, C.ID_BookCategory, S.Name AS Subcategory
		FROM BookCategory AS C
		INNER JOIN BookSubcategory AS S ON C.ID_BookCategory = S.ID_BookCategory
`;

const selectAllCountries = `
	SELECT * FROM Country ORDER BY Name
`;

const selectAllPayments = `
	SELECT * FROM paymentmethod ORDER BY method
`;

const insertReservation = `
	INSERT INTO
		reservation (id_contact,start_date,end_date,date_register)
		VALUES
		($1,$2,$3,$4)
		RETURNING id_reservation
`;

const insertReservationDetail = `
	INSERT INTO
		reservation_detail (id_bookedition, id_reservation,id_paymentmethod, tax, total)
		VALUES
		($1,$2,$3,$4,$5)
`;

const selectPriceFromBookEdition = `
	SELECT price
		FROM bookedition
		WHERE id_bookedition = $1
`;

const selectDifferenceBetweenTwoDates = `
	SELECT DATE_PART('day',CAST($1 as DATE)::timestamp - CAST($2 as DATE)::timestamp)
`;

const selectDateNow = `
	SELECT NOW()
`;

const selectDate = `
	SELECT TO_DATE($1, 'YYYY/MM/DD')
`;

module.exports = {
  insertBook,
  insertBookAuthor,
  insertBookPublisher,
  insertBookEdition,
  selectBookInnerJoin,
  selectAllBooks,
	deleteBookEdition,
	deletePublisherBook,
	deleteBookAuthor,
	deleteBook,
	selectAllCountries,
	selectAllCategories,
	selectAllBooksWithoutBookLink,
	selectBookInnerJoinWithoutBookLink,
	selectAllPayments,
	insertReservation,
	insertReservationDetail,
	selectPriceFromBookEdition,
	selectDifferenceBetweenTwoDates,
	selectDateNow,
	selectDate
};
