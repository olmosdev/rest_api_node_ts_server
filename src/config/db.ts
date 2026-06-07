import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

// We need a SSL or TLS connection. Just add at the end of the connection string "?ssl=true"
const db = new Sequelize(process.env.DATABASE_URL!, {
  // models: [__dirname + "/../models/**/*.ts"],
  models: [__dirname + "/../models/**/*"], // To deploy
  logging: false, // Add this if you want to run test with supertest
});

export default db;
