CREATE TABLE Book (
	ID_Book SERIAL PRIMARY KEY,
	ID_BookSubcategory INT REFERENCES BookSubcategory(ID_BookSubcategory) NOT NULL,
	ID_Series INT REFERENCES Series(ID_Series) NULL,
	Title VARCHAR(50) NOT NULL,
	Subtitle VARCHAR(50) NULL,
	Publication_Date DATE NOT NULL,
	Description TEXT NOT NULL
)