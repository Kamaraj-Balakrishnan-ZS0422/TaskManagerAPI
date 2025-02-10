const express = require('express');
const router = express.Router();
const {getUser,getAllUser} = require('../controllers/User');


router.get('/:id',getUser);
router.get('/',getAllUser);


module.exports = router;