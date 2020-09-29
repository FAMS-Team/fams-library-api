CREATE TABLE Reservation_Detail(
	ID_Reservation_Detail SERIAL PRIMARY KEY,
	ID_BookEdition INT REFERENCES BookEdition(ID_BookEdition) NOT NULL,
	ID_Reservation INT REFERENCES Reservation(ID_Reservation) NOT NULL,
	ID_PaymentMethod INT REFERENCES PaymentMethod(ID_PaymentMethod) NOT NULL,
	Tax MONEY NOT NULL,
	Total MONEY NOT NULL
)