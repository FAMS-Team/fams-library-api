const selectDifferenceBetweenTwoDates = `
	SELECT DATE_PART('day',CAST($1 as DATE)::timestamp - CAST($2 as DATE)::timestamp)
`;

const selectDateNow = `
	SELECT NOW()
`;

const selectDate = `
	SELECT TO_DATE($1, 'YYYY/MM/DD')
`;

const selectCurrentDate = `
    SELECT CURRENT_DATE
`

module.exports = {
    selectDifferenceBetweenTwoDates,
    selectDate,
    selectDateNow,
    selectCurrentDate
}