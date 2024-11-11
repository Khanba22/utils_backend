const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToMongo = require("./Database/DB");
dotenv.config();
connectToMongo()


const axios = require("axios")
const cron = require('node-cron');

// const serverURL = 'https://utils-backend.onrender.com/api';
const serverURL = 'http:localhost:4000/api';

const pingServer = async () => {
  try {
    const response = await axios.get(serverURL);
    console.log(`Pinged server successfully at ${new Date().toISOString()}`);
  } catch (error) {
    console.error(`Error pinging server: ${error.response ? error.response.status : error.message}`);
  }
};

cron.schedule('*/5 * * * *', () => {
  console.log('Pinging server to keep it awake...');
  pingServer();
});



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
  console.log("Server Active");
  res.send("Server Active");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
