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

const selectReservationsFromUser = `
	SELECT R.ID_Reservation, R.ID_Contact, BE.ID_BookEdition, B.Title, B.Subtitle, BE.Image_Link, BE.Book_Link, R.Start_Date, R.End_Date, RD.Total FROM Reservation AS R
	INNER JOIN Reservation_Detail AS RD
	ON RD.ID_Reservation = R.ID_Reservation
	INNER JOIN BookEdition AS BE
	ON BE.ID_BookEdition = RD.ID_BookEdition
	INNER JOIN Publisher_Book AS PB
	ON PB.ID_Publisher_Book = BE.ID_Publisher_Book
	INNER JOIN Book AS B
	ON PB.ID_Book = B.ID_Book
	GROUP BY R.ID_Contact, R.ID_Reservation, BE.ID_BookEdition, B.Title, B.Subtitle, BE.Image_Link, BE.Book_Link, R.Start_Date, R.End_Date, RD.Total
	HAVING R.ID_Contact = $1
`

module.exports = {
    insertReservation,
    insertReservationDetail,
	selectPriceFromBookEdition,
	selectReservationsFromUser
}