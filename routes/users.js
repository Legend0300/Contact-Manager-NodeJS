const express = require('express');

const router = express.Router();

const {  getUser, createUser , loginUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateToken');

router.get('/current', validateToken , getUser);

router.post("/login" , loginUser);

router.post("/register", createUser);


module.exports = router;

