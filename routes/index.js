const router = require('express').Router();
const upload = require("../utils/multer");


const {getAllUSers, getUserByID, createUser, deleteUser, updateUser, login} = require('../controllers/useController');
const {getMenu, getMenuByID, createMenu, deleteMenu, updateMenu} = require('../controllers/menuController');
const {getPedido, getPedidoByID, createPedido, deletePedido, updatePedido} = require('../controllers/pedidoController');

// rutas para usuarios
router.get('/alluser', getAllUSers);
router.get('/user/:id', getUserByID);
router.post('/register', createUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);
router.post('/login', login);

// rutas para menu
router.get('/menu', getMenu);
router.get('/menu/:id', getMenuByID);
router.post('/menu', upload.single("image"), createMenu);
router.delete('/menu/:id', deleteMenu);
router.put('/menu/:id', updateMenu);

// // rutas para pedidos
router.get('/pedido', getPedido);
router.get('/pedido/:id', getPedidoByID);
router.post('/pedido', createPedido);
router.delete('/pedido/:id', deletePedido);
router.put('/pedido/:id', updatePedido);


module.exports = router
// railway para hostear backend