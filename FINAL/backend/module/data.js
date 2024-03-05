const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    db.query(`
        SELECT 
            DIVISION.Division_Name,
            STUDENT.USN,
            STUDENT.First_Name,
            STUDENT.Last_Name,
            STUDENT.Phone_Number,
            STUDENT.Email AS Student_Email,
            COMPONENTS.Component_ID,
            COMPONENTS.Component_Name,
            COMPONENTS.DETAILS,
            COMPONENTS.Student_ID,
            TRANSACTION.Transaction_ID,
            TRANSACTION.Quantity,
            TRANSACTION.GSTIN_Number,
            TRANSACTION.Date,
            TRANSACTION.Total_Cost
        FROM 
            STUDENT
        JOIN 
            DIVISION 
        ON 
            STUDENT.Div_Name = DIVISION.Division_Name
        JOIN 
            COMPONENTS 
        ON 
            STUDENT.USN = COMPONENTS.Student_ID
        JOIN 
            TRANSACTION 
        ON 
            COMPONENTS.Component_ID = TRANSACTION.Product_ID
    `, (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
