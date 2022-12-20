const router = require('express').Router();
const upload = require("../utils/multer");
const authenticateAdmin = require('../middleware/authAdmin');
const authenticateUser = require('../middleware/authUser');


const {getAllUSers, getUserByID, createUser, deleteUser, updateUser, login} = require('../controllers/userController');
const {getMenu, getMenuByID, createMenu, deleteMenu, updateMenu, updateEstadoMenu, updateSugeridoMenu} = require('../controllers/menuController');
const {getPedido, getPedidoByID, createPedido, deletePedido, updatePedido, updateEstadoPedido} = require('../controllers/pedidoController');
const {getAllCategories, getCategoryByID, createCategory, deleteCategory, updateCategory} = require('../controllers/categoriaController');

// rutas para usuarios
router.get('/alluser', getAllUSers);
router.get('/user/:id', authenticateUser, getUserByID);
router.post('/register', createUser);
router.delete('/user/:id', authenticateUser, deleteUser);
router.put('/user/:id', authenticateUser, updateUser);
router.post('/login', login);

// rutas para menu
router.get('/menu', getMenu);
router.get('/menu/:id', getMenuByID);
router.post('/menu', authenticateAdmin, upload.single("imagen"), createMenu);
router.delete('/menu/:id', authenticateAdmin, deleteMenu);
router.put('/menu/:id', authenticateAdmin, updateMenu);
router.patch('/menu/:id', authenticateAdmin, updateEstadoMenu); //actualizar estado del menu
router.patch('/menu/sugerido/:id', authenticateAdmin, updateSugeridoMenu); //actualizar si el menu se vera en sugeridos

// rutas para pedidos
// router.get('/pedido', getPedido);
router.get('/pedido/:id', authenticateUser, getPedidoByID);
router.post('/pedido', authenticateUser, createPedido);
router.delete('/pedido/:id', authenticateUser, deletePedido);
router.put('/pedido/:id',authenticateUser , updatePedido);
router.patch('/pedido/:id',authenticateAdmin , updateEstadoPedido); // actualizar estado del pedido

//Rutas para categorias
router.get('/categorias', getAllCategories);
router.get('/categoria/:id', getCategoryByID);
router.post('/categoria', createCategory);
router.put('/categoria/:id', updateCategory);
router.delete('/categoria/:id', deleteCategory);


module.exports = router;