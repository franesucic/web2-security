/*const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "bazepodataka",
    host: "localhost",
    port: 5432,
    database: "web2-security",
    multipleStatements: true
});

module.exports = pool;*/

const { Pool } = require('pg');
const itemsPool = new Pool({
    connectionString: "postgres://web2_security_gbyg_user:cTxzVIGyzUVxEd6x78OTBIAg3cOj7Ojf@dpg-cl5t2jt6fh7c73ev5ui0-a.oregon-postgres.render.com/web2_security_gbyg",
    ssl: true
    /*ssl: {
        require: true,
        rejectUnauthorized: false
    }*/
    //ssl: process.env.DATABASE_URL ? true : false
});
module.exports = itemsPool;