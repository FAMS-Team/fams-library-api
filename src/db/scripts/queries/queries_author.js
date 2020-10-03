const selectAllAuthors = `
    SELECT * FROM Author ORDER BY Name
`

const insertAuthor = `
    INSERT INTO Author (Name, Last_Name, Date_Birth, Date_Death, Description, ID_Country)
    VALUES ($1, $2, $3, $4, $5, $6)
`

const updateAuthorName = `
    UPDATE Author SET Name = $1 
    WHERE ID_Author = $2
`

const updateAuthorLastname = `
    UPDATE Author SET Last_Name = $1 
    WHERE ID_Author = $2
`

const updateAuthorDescription = `
    UPDATE Author SET Description = $1 
    WHERE ID_Author = $2
`

const updateAuthorDateDeath = `
    UPDATE Author SET Date_Death = $1 
    WHERE ID_Author = $2
`

const updateAuthorDateBirth = `
    UPDATE Author SET Date_Birth = $1 
    WHERE ID_Author = $2
`
const updateAuthorCountry = `
    UPDATE Author SET ID_Country = $1 
    WHERE ID_Author = $2
`

module.exports = {
    selectAllAuthors,
    insertAuthor,
    updateAuthorName,
    updateAuthorLastname,
    updateAuthorDescription,
    updateAuthorDateDeath,
    updateAuthorDateBirth,
    updateAuthorCountry
}