const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const conectarDB = require("./database/db");
const router = require("./routes/index");

//middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));

const port = process.env.PORT;
app.get("/",(req, res)=>{
    return res.send("holiwi")
})

app.use("/", router);

//ejecutar conexcion a DB
conectarDB();

app.listen(port, () => {
  console.log(`mi servidor esta funcionando en el puerto ${port}`);
});