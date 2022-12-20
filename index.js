const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const conectarDB = require("./database/db");
const cloudinary= require("cloudinary").v2
const router = require("./routes/index");
const passport = require("passport");
const jwtStrategy = require("./passport/jwt");


//middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));

passport.use("jwt", jwtStrategy);

app.use("/", router);

const port = process.env.PORT;

app.get("/",(req, res)=>{
    return res.send("holiwi")
})

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.APY_KEY, 
  api_secret: process.env.API_SECRET,
});

//ejecutar conexcion a DB
conectarDB();

app.listen(port, () => {
  console.log(`mi servidor esta funcionando en el puerto ${port}`);
});

