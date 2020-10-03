const selectAllCategories = `
	SELECT C.Name AS Category, S.ID_BookSubcategory, C.ID_BookCategory, S.Name AS Subcategory
		FROM BookCategory AS C
		INNER JOIN BookSubcategory AS S ON C.ID_BookCategory = S.ID_BookCategory
`;

module.exports = {
    selectAllCategories
}