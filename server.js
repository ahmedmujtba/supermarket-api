const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/mongoDb.js");
const ImportData = require("./dataImport.js");
const productRouter = require("./routes/Product.Routes.js");
const { errorHandler, notFound } = require("./middleware/Error.js");
const userRouter = require("./routes/User.Routes.js");
const shoppingListRouter = require("./routes/ShoppingList.Routes.js");
const cors = require("cors");

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

// //API
app.use("/api/import", ImportData);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/shopping-list/", shoppingListRouter);

// //ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is live...");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, console.log(`server is running on port ${PORT}...`));

module.exports = app;
