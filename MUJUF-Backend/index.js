import express from "express";
import "dotenv/config";
import DB from "./model/db.js";
import CustomError from "./middleware/customError.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authRoute from "./auth/authRoute.js";
import cors from "cors";
//App setup
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", authRoute);
app.get("*", (req, res, next) => {
  next(new CustomError("This route does not exist", 404));
});

//Universal error handler that catches the error thrown with next()
app.use(errorMiddleware);

//Server
(async () => {
  try {
    await DB.execute("SELECT 1");
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
})();
