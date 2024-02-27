const express = require('express');
const router = express.Router();
const db = require('./db');


router.post('/', (req, res) => {
   
    const { student, component, transaction } = req.body;

   
    student.Div_Name = "propulsion";

   
    db.query('INSERT INTO STUDENT SET ? ON DUPLICATE KEY UPDATE ?', [student, student], (err, result) => {
        if (err) {
            console.error('Error inserting or updating student record:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

       
        component.Student_ID = student.USN;

        
        db.query('INSERT INTO COMPONENTS SET ?', component, (err, result) => {
            if (err) {
                console.error('Error inserting component record:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            
            transaction.Product_ID = component.Component_ID;

           
            db.query('INSERT INTO TRANSACTION SET ?', transaction, (err, result) => {
                if (err) {
                    console.error('Error inserting transaction record:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.status(200).json({ message: 'Data inserted successfully' });
            });
        });
    });
});

// GET request to fetch data of students whose Div_Name is propulsion along with COMPONENT and TRANSACTION details
router.get('/', (req, res) => {
    // Fetch students, components, and transactions for the "avionics" division
    const query = `
        SELECT 
            s.*, c.*, t.*
        FROM 
            STUDENT s
        JOIN 
            COMPONENTS c ON s.USN = c.Student_ID
        JOIN 
            TRANSACTION t ON c.Component_ID = t.Product_ID
        WHERE 
            s.Div_Name = 'propulsion'
    `;
    
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json(result);
    });
});

module.exports = router;
