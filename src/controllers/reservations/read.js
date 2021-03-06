const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_reservation');

const reservations = async (req, res) => {
    try{
        const result = await db.query(queries.selectReservationsFromUser, [req.user.id_contact]);
        return res.status(200).json(result.rows);
    } catch (error){
        return res.status(500).send(error.stack);
    }   
}

module.exports = reservations;