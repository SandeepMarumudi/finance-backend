const express = require("express");
const connectDB = require("./utils/dataBase");
const authRouter = require("./routes/auth");
const transRouter = require("./routes/transaction");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://finance-backend-gh6r.onrender.com",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );



app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://finance-frontend-pied.vercel.app"
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", transRouter);

connectDB()
  .then(() => {
    console.log("dataBase connected successfully");
    app.listen("5000", () => {
      console.log("Server started running on 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
