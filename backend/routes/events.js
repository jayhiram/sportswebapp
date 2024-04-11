// routes/events.js

const express = require('express');
const router = express.Router();

// Temporary storage for events
let events = [];

// Route for adding a new event
router.post('/', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent);
  res.json(newEvent);
});

module.exports = router;
