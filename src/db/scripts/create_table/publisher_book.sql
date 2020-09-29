CREATE TABLE Publisher_Book(
	ID_Publisher_Book SERIAL PRIMARY KEY,
	ID_Book INT REFERENCES Book(ID_Book) NOT NULL,
	ID_Publisher INT REFERENCES Publisher(ID_Publisher) NOT NULL
)