const express = require('express');
const mysql = require('mysql2');
const db = require('./db'); // Assuming db.js contains your database connection setup

const router = express.Router();

// Endpoint to fetch total spent amount by division
router.get('/', (req, res) => {
  const query = `
    SELECT s.Div_Name, SUM(t.Total_Cost) AS total_spent
    FROM STUDENT s
    JOIN COMPONENTS c ON s.USN = c.Student_ID
    JOIN TRANSACTION t ON c.Component_ID = t.Product_ID
    GROUP BY s.Div_Name
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total spent by division:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
