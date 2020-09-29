CREATE TABLE BookSubcategory(
	ID_BookSubcategory SERIAL PRIMARY KEY,
	ID_BookCategory INT REFERENCES BookCategory(ID_BookCategory) NOT NULL,
	Name VARCHAR(50) NOT NULL
)