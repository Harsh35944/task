const express = require("express");
const cors = require("cors");
const testRoute = require("./routes/test.router");
const authRoute = require("./routes/auth.router");
const jetRoute = require("./routes/jet.router");
const bookRoute = require("./routes/book.router");
const errorMiddleware = require("./common/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/jet", jetRoute);
app.use("/api/book", bookRoute);

app.use(errorMiddleware);

module.exports = app;
