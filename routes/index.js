const router = require('express').Router();
const { getAllUsers, getUserById, register } = require('../controllers/UserController');

router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/register', register);

module.exports = router;