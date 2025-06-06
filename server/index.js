const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { main } = require("./config/db");
const authRouter = require("./routes/userAuth");
const jobRoute = require("./routes/jobRoute");
const employeeRoute = require("./routes/employeeRoute");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
main();

app.use("/api/v1/userAuth", authRouter);
app.use("/api/v1/jobRoute", jobRoute);
app.use("/api/v1/employee", employeeRoute);

app.listen(process.env.PORT, () => {
  console.log("server is listening on port " + process.env.PORT);
});
