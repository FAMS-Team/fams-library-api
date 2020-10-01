const insertBook = `
	INSERT INTO 
		book (id_booksubcategory,id_series,title,subtitle,publication_date,description) 
	VALUES 
		($1,$2,$3,$4,$5,$6)
	RETURNING id;
	`;

module.exports = { insertBook };
