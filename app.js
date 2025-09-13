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
      // ✅ Allowed origins for dev & production
      const allowedOrigins = [
        "http://localhost:5173", // local dev
        "https://finance-frontend-pied.vercel.app", // production frontend
      ];

      // ✅ Regex for all Vercel preview deployments
      const vercelPreviewRegex = /^https:\/\/finance-frontend-git-main-sandeeps-projects-[a-z0-9]+\.vercel\.app$/;

      if (
        !origin || // allow tools like Postman or curl
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // 👈 needed for cookies
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
