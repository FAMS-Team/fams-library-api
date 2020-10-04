const selectAllPublishers = `
    SELECT P.ID_Publisher, P.Name, C.Name FROM Publisher AS P
    INNER JOIN Country AS C
    ON P.ID_Country = C.ID_Country
    ORDER BY P.Name
`

const insertPublisher = `
    INSERT INTO Publisher (Name, ID_Country)
    VALUES ($1, $2)
`

const updatePublisher = `
    UPDATE Publisher SET 
        Name = $1,
        ID_Country = $2
    WHERE ID_Publisher = $3
`

module.exports = {
    selectAllPublishers,
    insertPublisher
}