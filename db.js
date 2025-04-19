const mongoose = require("mongoose");

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}`;

async function connect() {
  try {
      if (mongoose.connection.readyState === 0) {
          console.log("Connecting to MongoDB...");
          await mongoose.connect(dbUrl);
          console.log("Successfully connected to MongoDB");
      }
  } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
  }
}

module.exports = { connect };