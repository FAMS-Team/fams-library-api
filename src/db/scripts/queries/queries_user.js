const getUserFromEmail = `
    SELECT * FROM Contact 
    WHERE Email = $1
`

const getRefreshTokenFromContact = `
    SELECT RefreshToken FROM Session 
    WHERE ID_Contact = $1
`

const updateRefreshToken = `
    UPDATE Session SET RefreshToken = $1 
    WHERE ID_Contact = $2
`

const insertRefreshToken = `
    INSERT INTO Session (ID_Contact, RefreshToken) 
    VALUES ($1, $2)
`

const deleteRefreshToken = `
    DELETE FROM Session 
    WHERE RefreshToken = $1
`

const getRefreshTokenFromToken = `
    SELECT RefreshToken FROM Session 
    WHERE RefreshToken = $1
`

const insertUserNoPhone = `
    INSERT INTO Contact(ID_ContactType, Name, Last_Name, Email, Password) 
    VALUES(2, $1, $2, $3, $4)
`

const insertUserPhone = `
    INSERT INTO Contact(ID_ContactType, Name, Last_Name, Email, Phone, Password) 
    VALUES(2, $1, $2, $3, $4, $5)
`

const insertAdminPhone = `
    INSERT INTO Contact(ID_ContactType, Name, Last_Name, Email, Phone, Password) 
    VALUES($1, $2, $3, $4, $5, $6)
`

const insertAdminNoPhone = `
    INSERT INTO Contact(ID_ContactType, Name, Last_Name, Email, Password) 
    VALUES($1, $2, $3, $4, $5)
`

module.exports = {
    getUserFromEmail,
    getRefreshTokenFromContact,
    getRefreshTokenFromToken,
    updateRefreshToken,
    insertRefreshToken,
    deleteRefreshToken,
    insertUserPhone,
    insertUserNoPhone,
    insertAdminPhone,
    insertAdminNoPhone
}