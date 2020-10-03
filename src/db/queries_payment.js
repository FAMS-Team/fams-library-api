const selectAllPayments = `
	SELECT * FROM paymentmethod ORDER BY method
`;

module.exports = {
    selectAllPayments
}