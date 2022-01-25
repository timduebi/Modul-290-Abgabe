'use strict';


'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({orgin: '*'}));
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to ContactDB!" });
});

require("./customer/api.js")(app);
