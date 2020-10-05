const selectAllSeries = `
	SELECT * FROM Series ORDER BY Name
`;

const insertSeries = `
    INSERT INTO Series (Name)
    VALUES ($1)
`

module.exports = {
    selectAllSeries,
    insertSeries
}