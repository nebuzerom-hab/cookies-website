const db = require("./DBConfi");

async function test() {
  try {
    await db.query("SELECT 1");
    console.log("✅ DB connection works!");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
}

test();
