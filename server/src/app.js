// External Modules
const express = require("express");
require("@dotenvx/dotenvx").config(); // with dotenvx now we can encrypt .env files

// Local Modules
require("./config/connectDB");
const userRouter = require("./routes/userRoutes");

const app = express();

//middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Local Routes
app.use("/user", userRouter);

// Server Start
const PORT = process.env.PORT;
app.listen(PORT || 1000, () => {
	console.log(`server is running...`);
});
