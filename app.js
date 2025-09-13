const express = require("express");
const connectDB = require("./utils/dataBase");
const authRouter = require("./routes/auth");
const transRouter = require("./routes/transaction");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://finance-frontend-pied.vercel.app/",
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", transRouter);

connectDB()
  .then(() => {
    console.log("dataBase connected successfully");
    app.listen("7888", () => {
      console.log("Server started running on 7888 ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
