const express = require('express');
const router = express.Router();
const db = require('./db');

// POST request to insert data into tables
router.post('/', (req, res) => {
    // Extracting student, component, and transaction from the request body
    let { student, component, transaction } = req.body;

    // Ensure that the Div_Name is always set to "aerostructures"
    student.Div_Name = "aerostructures";

    // Check if the student with the given student_ID exists in the database
    db.query('SELECT * FROM STUDENT WHERE USN = ?', student.USN, (err, rows) => {
        if (err) {
            console.error('Error checking student record:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // If the student exists, skip inserting into the STUDENT table
        if (rows.length > 0) {
            // Student already exists, skipping insertion
            insertComponentAndTransaction();
        } else {
            // Insert into the STUDENT table
            db.query('INSERT INTO STUDENT SET ?', student, (err, result) => {
                if (err) {
                    console.error('Error inserting into STUDENT table:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                insertComponentAndTransaction();
            });
        }
    });

    function insertComponentAndTransaction() {
        // Insert into COMPONENTS table
        db.query('INSERT INTO COMPONENTS SET ?', component, (err, result) => {
            if (err) {
                console.error('Error inserting into COMPONENTS table:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            // Insert into TRANSACTION table
            db.query('INSERT INTO TRANSACTION SET ?', transaction, (err, result) => {
                if (err) {
                    console.error('Error inserting into TRANSACTION table:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.status(200).json({ message: 'Data inserted successfully' });
            });
        });
    }
});

// GET request to fetch data of students whose Div_Name is aerostructures along with COMPONENT and TRANSACTION details
router.get('/', (req, res) => {
    // Fetch students with Div_Name "aerostructures"
    db.query('SELECT * FROM STUDENT WHERE Div_Name = ?', 'aerostructures', (err, students) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Fetch COMPONENT and TRANSACTION details for students with Div_Name "aerostructures"
        db.query('SELECT * FROM COMPONENTS WHERE Student_ID IN (SELECT USN FROM STUDENT WHERE Div_Name = ?)', 'aerostructures', (err, components) => {
            if (err) {
                console.error('Error fetching components:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            db.query('SELECT * FROM TRANSACTION WHERE Product_ID IN (SELECT Component_ID FROM COMPONENTS WHERE Student_ID IN (SELECT USN FROM STUDENT WHERE Div_Name = ?))', 'aerostructures', (err, transactions) => {
                if (err) {
                    console.error('Error fetching transactions:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                res.status(200).json({ students, components, transactions });
            });
        });
    });
});

module.exports = router;
