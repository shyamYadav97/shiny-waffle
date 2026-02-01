const express = require('express');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tickets
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('createdBy', 'username');
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create ticket
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ title, description, createdBy: req.user.id });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update ticket
router.put('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;