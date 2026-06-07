import { connectDB } from "../server";
import db from "../config/db";

// This is a global function provided by jest
// To run this, add the following on package.json: "scripts": { "dev": "nodemon --exec ts-node src/index.ts", "test": "jest" },
// Add in the tsconfig.json the following: "types": ["node", "jest"],
// it() and test() is the same. it() is an alias
// Now, run: npm test
// Use coverage adding "test:coverage": "npm run pretest && jest --detectOpenHandles --coverage", on package.json and then run: npm run test:coverage

// Simulating behavior of the API with Jest and SuperTest
jest.mock("../config/db");
describe("connectDB", () => {
  it("Should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("There was an error connecting to the database."),
      );
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("There was an error connecting to the database."),
    );
  });
});
