const selectAllAuthors = `
    SELECT * FROM Author ORDER BY Name
`

const insertAuthor = `
    INSERT INTO Author (Name, Last_Name, Date_Birth, Date_Death, Description, ID_Country)
    VALUES ($1, $2, $3, $4, $5, $6)
`

module.exports = {
    selectAllAuthors,
    insertAuthor
}