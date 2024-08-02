const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const groupsRoutes = require("./routes/groupRoutes");
const db = require('../server/db/db')


const app = express();
require('dotenv').config();
db();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;




app.use("/api/groups", groupsRoutes);


app.get("/", (req, res) => {
    res.json({ message: "working" });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



        
        
