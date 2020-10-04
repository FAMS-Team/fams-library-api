const selectAllAuthors = `
    SELECT * FROM Author AS A
    INNER JOIN Country AS C
    ON A.ID_Country = C.ID_Country
    ORDER BY A.Name
`

const insertAuthor = `
    INSERT INTO Author (Name, Last_Name, Date_Birth, Date_Death, Description, ID_Country)
    VALUES ($1, $2, $3, $4, $5, $6)
`

const updateAuthor = `
    UPDATE Author SET 
        Name = $1,
        Last_Name = $2,
        Date_Birth = $3,
        Date_Death = $4,
        Description = $5,
        ID_Country = $6
    WHERE ID_Author = $7
`

module.exports = {
    selectAllAuthors,
    insertAuthor,
    updateAuthor
}