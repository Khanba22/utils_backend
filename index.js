const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToMongo = require("./Database/DB");
dotenv.config();
connectToMongo()

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
// Use design route for template handling
app.use("/api/design", require("./routes/templateRoute"));
app.use("/api/certificate", require("./routes/certificateRoute"));

// Root route to check server status
app.get("/api", (req, res) => {
  res.send("Server Active");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
