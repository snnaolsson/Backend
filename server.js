const express = require('express');
const bodyParser = require('body-parser');
const autRoutes = require("./routes/autRoutes");
const menuRoutes = require('./routes/menuRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');



const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//routes
app.use("/users", autRoutes);
app.use('/api/menu', menuRoutes); //Menyrutter
app.use('/api/bookings', bookingRoutes); //Bokningsrutter

//protected route
app.get("/users/protected", authenticateToken, (req,res)=>{
    res.json({message: 'skyddad route'});
});
//validate token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) res.status(404).json({message: 'not authorized for this route - token missing'});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username)=>{
        if(err)return res.status(403).json({message: 'not correct jwt'});

        req.username = username;
        next();
    });
}

//start applikation
app.listen(port, ()=>
console.log('server runing on port: '+ port));