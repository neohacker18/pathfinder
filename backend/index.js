const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Hello world!"
    })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
