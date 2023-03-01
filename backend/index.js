const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser=require('body-parser');

const algoRoutes = require("./api/routes/algorithm");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", algoRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
