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

module.exports = {
    insertReservation,
    insertReservationDetail,
    selectPriceFromBookEdition
}