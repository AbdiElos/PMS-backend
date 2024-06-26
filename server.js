require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptionsDelegate = require("./config/cors.js");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middlewares/verifyJWT");
const credentials = require("./middlewares/credentials");
const path = require("path");
const connection = require("./config/connect");
require("dotenv").config();
connection;

const PORT = process.env.PORT || 3500;

// Establish database connection

// Middleware
app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/settings", require("./routes/api/settings.js"));
app.use("/ums", require("./routes/api/ums"));
app.use("/organization", require("./routes/api/organization"));
app.use("/project", require("./routes/api/projectroute"));
// app.use(verifyJWT);
app.use("/trash", require("./routes/api/trash.js"));

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
