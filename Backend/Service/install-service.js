const connection = require("../Database/DBConfi");
const createTables = require("../Service/sql"); // imported string of SQL

async function install() {
  let finalmessage = {};

  try {
    // Split into individual queries by semicolon
    const queries = createTables.split(";");

    for (let query of queries) {
      if (query.trim()) {
        await connection.query(query);
        console.log("Executed:", query);
      }
    }

    finalmessage.message = "All tables created successfully";
    finalmessage.status = 200;
  } catch (err) {
    console.log("Error:", err);
    finalmessage.message = err.message;
    finalmessage.status = 500;
  }

  return finalmessage;
}

module.exports = { install };
