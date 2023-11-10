const { Pool } = require('pg');
const itemsPool = new Pool({
    connectionString: "postgres://web2_security_gbyg_user:cTxzVIGyzUVxEd6x78OTBIAg3cOj7Ojf@dpg-cl5t2jt6fh7c73ev5ui0-a.oregon-postgres.render.com/web2_security_gbyg",
    //ssl: true,
    //connectionString: process.env.DBConnLink,
    ssl: {
        //require: true,
        rejectUnauthorized: false
    }
});
module.exports = itemsPool;