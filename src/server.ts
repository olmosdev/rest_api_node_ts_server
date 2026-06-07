// Server configuration
// Using Handlers (controllers)
// Add the following empty file called "tsconfig.json" at the same level as the package.json
// Add TypeScript interpreter with: npm i -D typescript ts-node
// Run: npx ts-node src/index.ts
// Install: npm i -D nodemon  to be able tun run "npm run dev" to automatically restart the server after each change. Just add the following on package.json
// scripts": { "dev": "nodemon --exec ts-node src/index.ts" },
// To compile the files to JS (using tsconfig.json) run: npx tsc src/index.ts or npx tsc (better option)

import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import productsRouter from "./router";
import db from "./config/db";

// To connect to db
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(
    //   colors.blue("Connection to the database successfully established."),
    // ); Disable certain console.log() when running tests with supertest since you cannot do that after running the tests
  } catch (error) {
    // console.log(error);
    console.log(
      colors.red.bold("There was an error connecting to the database."),
    );
  }
}
connectDB();

// Express Instance
const server = express();

// Allow conections CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // "callback" either allows or denies the connection
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("CORS error"));
    }
  },
};
server.use(cors(corsOptions));

// To read data from forms (use() is used in all requests)
server.use(express.json());

// Logging
server.use(morgan("dev"));

// Routing
server.use("/api/products", productsRouter);

// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions),
);

export default server;
