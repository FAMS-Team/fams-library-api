CREATE TABLE Publisher(
	ID_Publisher SERIAL PRIMARY KEY,
	ID_Country INT REFERENCES Country(ID_Country) NOT NULL,
	Name VARCHAR(30) NOT NULL
)