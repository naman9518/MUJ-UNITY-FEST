import express from "express";
import "dotenv/config";
import DB from "./model/db.js";
import CustomError from "./middleware/customError.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRoute from "./route/userRoute.js";
import cors from "cors";
const app = express();
app.use(express.json());

app.use("/api/users", userRoute);
app.use(cors());
app.get("*", (req, res, next) => {
  next(new CustomError("This route does not exist", 404));
});

//Universal error handler that catches the error thrown with next()
app.use(errorMiddleware);
//Server code
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
