import express from "express";
import cors from "cors";
import { testConnection, connectDB } from "./db/index.js"; //1.
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
import usersRouter from "./services/users/index.js";
import categoryRouter from "./services/categories/index.js";
// import models from "./db/models/index.js"; //2.

const server = express();

const { PORT = 5001 } = process.env;

server.use(cors());

server.use(express.json());
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/users", usersRouter);
server.use("/categories", categoryRouter);

server.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await testConnection();
  await connectDB();
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
