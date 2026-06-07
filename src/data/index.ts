import { exit } from "node:process";
import db from "../config/db";

// To clear data after running tests (npm run db)
// It is executed automatically because the following was defined in package.json: "pretest": "ts-node ./src/data --clear"
// You can use "posttest"

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Data deleted successfully");
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}

// console.log(process.argv);
