const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    "postgres://dzevhhjyruavzo:bb5e81f4f13cba165490da4d5c66316481379096d02e9e0e5cac27696d3d7994@ec2-35-169-92-231.compute-1.amazonaws.com:5432/dce869kcj9h85g",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
