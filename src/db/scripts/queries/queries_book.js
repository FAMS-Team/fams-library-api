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
		B.title, B.subtitle, B.description, B.publication_date, BSC.id_booksubcategory ,BSC.name,BC.id_bookcategory, BC.name, S.id_series, S.name,
		A.name, A.last_name
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
		WHERE B.id_book = $1;
`;

/*
const selectAllBooks = `
	SELECT B.ID_Book, C.Name as category, SC.Name AS subcategory, S.Name AS series,
	B.Title, B.SubTitle, B.Publication_Date, B.Description, A.Name AS author_name, A.Last_Name AS author_lastname
	FROM Book AS B
	INNER JOIN Series AS S
	ON B.ID_Series = S.ID_Series
	INNER JOIN BookSubcategory AS SC
	ON SC.ID_BookSubcategory = B.ID_BookSubcategory
	INNER JOIN BookCategory AS C
	ON SC.ID_BookCategory = C.ID_BookCategory
	INNER JOIN Book_Author AS BA
	ON BA.ID_Book = B.ID_Book
	INNER JOIN Author AS A
	ON BA.ID_Author = A.ID_Author
`;
*/

const selectAllBooks = `
	SELECT B.ID_Book, C.Name as category, SC.Name AS subcategory, S.Name AS series,
	B.Title, B.SubTitle, B.Publication_Date, B.Description
	FROM Book AS B
	INNER JOIN Series AS S
	ON B.ID_Series = S.ID_Series
	INNER JOIN BookSubcategory AS SC
	ON SC.ID_BookSubcategory = B.ID_BookSubcategory
	INNER JOIN BookCategory AS C
	ON SC.ID_BookCategory = C.ID_BookCategory
`;

const selectAllBookAuthor = `
	SELECT A.id_author, A.name, A.last_name
	FROM book_author AS BA
	INNER JOIN author AS A
	ON A.id_author = BA.id_author
	WHERE id_book = $1
	`;
/*
const selectAllEditionBooksWithoutBookLink = `
	SELECT
		P.name,BE.edition, BE.page_number, BE.isbn, BE.price, BE.image_link
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
*/

const searchBooksByTitle = `
	${selectAllBooks}
	WHERE B.Title ILIKE $1
`;

const searchBooksByAuthor = `
	${selectAllBooks}
	WHERE A.Name ILIKE $1 OR A.Last_Name LIKE $1
`;

const searchBooksBySeries = `
	${selectAllBooks}
	WHERE S.Name ILIKE $1
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

/*
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
*/

const updateSubCategoryID = `
	UPDATE book SET id_booksubcategory = $1
	WHERE id_book = $2
`;

const updateSeriesID = `
	UPDATE book SET id_series = $1
	WHERE id_book = $2
`;

const updateTitle = `
	UPDATE book SET title = $1
	WHERE id_book = $2
`;

const updateSubTitle = `
	UPDATE book SET subtitle = $1
	WHERE id_book = $2
`;

const updatePublicationDate = `
	UPDATE book SET publication_date = $1
	WHERE id_book = $2
`;

const updateDescription = `
	UPDATE book SET description = $1
	WHERE id_book = $2
`;

module.exports = {
	insertBook,
	insertBookAuthor,
	selectBookInnerJoin,
	selectAllBooks,
	searchBooksByAuthor,
	searchBooksByTitle,
	searchBooksBySeries,
	deleteBookEdition,
	deletePublisherBook,
	deleteBookAuthor,
	deleteBook,
	//updateBook
	updateSubCategoryID,
	updateSeriesID,
	updateTitle,
	updateSubTitle,
	updatePublicationDate,
	updateDescription,
	selectAllBookAuthor
};
