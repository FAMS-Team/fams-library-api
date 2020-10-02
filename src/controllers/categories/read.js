const db = require('../../db/postgres');

const categories = async (req, res) => {
    try{
        const result = await db.query('SELECT C.Name AS Category, S.Name AS Subcategory FROM BookCategory AS C INNER JOIN BookSubcategory AS S ON C.ID_BookCategory = S.ID_BookCategory');
        
        //Arranges result in nested json
        const cats = [];
        let category = result.rows[0].category;
        let subcategories = [];
        result.rows.forEach(item =>{
            if(item.category !== category) {
                cats.push({category: category, subcategories: subcategories});
                category = item.category;
                subcategories = [];
            }
            subcategories.push(item.subcategory);
        });
        cats.push({category: category, subcategories: subcategories})

        res.status(200).json(cats);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = categories;