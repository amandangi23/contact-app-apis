const express = require('express');
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController.js');
const validateToken = require('../middleware/validateTokenHandler.js');

router.use(validateToken);

router.get('/', getContacts);

router.post('/', createContact);

router.get('/:id', getContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);



module.exports = router;