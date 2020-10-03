const selectAllPublishers = `
    SELECT * FROM Publisher ORDER BY Name
`

const insertPublisher = `
    INSERT INTO Publisher (Name, ID_Country)
    VALUES ($1, $2)
`

module.exports = {
    selectAllPublishers,
    insertPublisher
}