//start
const Joi = require('joi');
const express = require('express');
const mysql = require('mysql');

//start up with express
const app = express()
app.use(express.json());   //for post-express call

//conneting to my database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lingaiah60",
    database: "TEAM_DATABASE"
});

//content
app.get('/', (req, res)=> {
    res.send('Hello World');
});

app.get('/student', (req, res) => {
    const q = "SELECT * FROM STUDENT;";
    db.query(q,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post('/student', (req,res)=>{
    const q = "INSERT INTO STUDENT (`First_Name`, `Last_Name`) VALUES (?)";
    //const values = ["DARSHAN", "JADHAV"];
    const values = [
        req.body.First_Name,
        req.body.Last_Name
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("STUDENT DATA ADDED");
    })
});



//end
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to PORT'));