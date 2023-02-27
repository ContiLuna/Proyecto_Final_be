const router = require('express').Router();
const upload = require("../utils/multer");
const authenticateAdmin = require('../middleware/authAdmin');
const authenticateUser = require('../middleware/authUser');


const {getAllUSers, getUserByID, createUser, deleteUser, updateUser, login, cambiarEstadoUsuario} = require('../controllers/userController');
const {getMenu, getMenuByID, createMenu, deleteMenu, updateMenu, updateEstadoMenu, updateSugeridoMenu, getAllMenu} = require('../controllers/menuController');
const {getPedidoByID, createPedido, deletePedido, updatePedido, updateEstadoPedido, getPedidos, getPedidosByUser} = require('../controllers/pedidoController');
const {getAllCategories, getCategoryByID, createCategory, deleteCategory, updateCategory} = require('../controllers/categoriaController');

// rutas para usuarios
router.get('/alluser', authenticateAdmin, getAllUSers);
router.get('/user/:id', authenticateUser, getUserByID);
router.post('/register', createUser);
router.delete('/user/:id', authenticateUser, deleteUser);
router.put('/user/:id', authenticateUser, updateUser);
router.post('/login', login);
router.patch('/user/:id', cambiarEstadoUsuario); //actualizar estado del usuario

// rutas para menu
router.get('/menu', getAllMenu);
router.get('/menu/:id', getMenuByID);
router.post('/menu', authenticateAdmin, upload.single("imagen"), createMenu);
router.delete('/menu/:id', deleteMenu);
router.put('/menu/:id', updateMenu);
router.patch('/menu/:id', updateEstadoMenu); //actualizar estado del menu
router.patch('/menu/sugerido/:id', authenticateAdmin, updateSugeridoMenu); //actualizar si el menu se vera en sugeridos

// rutas para pedidos
router.get('/pedido', getPedidos);
router.get('/pedidos/user/:id', getPedidosByUser);
router.get('/pedido/:id', authenticateUser, getPedidoByID);
router.post('/pedido', createPedido);
router.delete('/pedido/:id', deletePedido);
router.put('/pedido/:id',authenticateUser , updatePedido);
router.patch('/pedido/:id',authenticateAdmin , updateEstadoPedido); // actualizar estado del pedido

//Rutas para categorias
router.get('/categorias', getAllCategories);
router.get('/categoria/:id', getCategoryByID);
router.post('/categoria', createCategory);
router.put('/categoria/:id', updateCategory);
router.delete('/categoria/:id', deleteCategory);


module.exports = router;