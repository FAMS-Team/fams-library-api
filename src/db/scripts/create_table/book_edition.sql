CREATE TABLE BookEdition(
	ID_BookEdition SERIAL PRIMARY KEY,
	Edition INT NOT NULL,
	Page_Number INT NOT NULL,
	ISBN CHAR(13) NOT NULL,
	Price MONEY NOT NULL,
	Image_Link BYTEA NOT NULL,
	Book_Link BYTEA NOT NULL
)