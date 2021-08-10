const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.DATABASE,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/api/users", require("./routers/userRouter"));
app.use("/api/products", require("./routers/productRouter"));
app.use("/api/orders", require("./routers/orderRouter"));
app.use("/api/uploads", require("./routers/uploadRouter"));
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
