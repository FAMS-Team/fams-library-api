const selectAllPublishers = `
    SELECT P.ID_Publisher, P.Name, C.Name AS Country FROM Publisher AS P
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

const updatePublisherName = `
    UPDATE Publisher SET Name = $1
    WHERE ID_Publisher = $2
`

const updatePublisherCountry = `
    UPDATE Publisher SET ID_Country = $1
    WHERE ID_Publisher = $2
`

module.exports = {
    selectAllPublishers,
    insertPublisher,
    updatePublisherName,
    updatePublisherCountry
}