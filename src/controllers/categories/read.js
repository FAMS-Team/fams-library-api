const db = require('../../db/postgres');
const queries = require('../../db/queries_category');

const getCategories = async (req, res) => {
    try{
        const result = await db.query(queries.selectAllCategories);

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

module.exports = getCategories;
