const express = require('express');
const rotuer = express.Router();
const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateToken');

rotuer.use(validateToken)

rotuer.route('/').get(getContacts).post(createContact);

rotuer.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = rotuer;