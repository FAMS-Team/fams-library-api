CREATE TABLE Session (
	ID_Session SERIAL PRIMARY KEY,
	ID_Contact INT REFERENCES Contact(ID_Contact) NOT NULL,
	Token TEXT NOT NULL
)