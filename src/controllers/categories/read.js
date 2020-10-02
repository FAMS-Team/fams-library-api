const db = require('../../db/postgres');

const categories = async (req, res) => {
    try{
        const result = await db.query('SELECT C.Name AS Category, S.ID_BookSubcategory, C.ID_BookCategory, S.Name AS Subcategory FROM BookCategory AS C INNER JOIN BookSubcategory AS S ON C.ID_BookCategory = S.ID_BookCategory');
        
        //Arranges result in nested json
        const cats = [];
        let category = result.rows[0];
        let subcategories = [];
        result.rows.forEach(item =>{
            if(item.id_bookcategory !== category.id_bookcategory) {
                cats.push({id: category.id_bookcategory, category: category.category, subcategories: subcategories});
                category = item;
                subcategories = [];
            }
            subcategories.push({id: item.id_booksubcategory, subcategory: item.subcategory});
        });
        cats.push({id: category.id_bookcategory, category: category.category, subcategories: subcategories});

        res.status(200).json(cats);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = categories;