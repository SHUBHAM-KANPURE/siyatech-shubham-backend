const http = require("http");
const express = require("express");
const ConnectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

const userRoute = require("./routes/userRoutes");
const tableRoute = require("./routes/tableRoutes");

app.use("/api/user/", userRoute);
app.use("/api/table", tableRoute);

const PORT = 1000;

// const server = http.createServer((req, res) => {
//     console.log('Hi');
//     res.writeHead(200, {'Content-type': 'text/html'})
//     res.write("Hello World !");
// }).listen(PORT);

const start = async () => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
  ConnectDB();
};
start();
