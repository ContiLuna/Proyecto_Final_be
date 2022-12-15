const Pedido = require('../models/PedidoSchema');
const mongoose = require('mongoose');

const getPedidos = async(req, res)=>{ // trae todos los pedidos
    // traer todos los pedidos
    const pedidos = await Pedido.find();
    try {
        if(!pedidos){
            return res.status(404).json({
                mensaje:'no se encontro pedido',
                status:404
            })
        }
        return res.status(200).json({
            mensaje:'pedidos encontrados',
            status:200,
            pedidos
        })
    } catch (error) {
        return res.status(500).json({
            error, 
            mensaje:'error en el servidor',
        })
    }
}

// traer pedido por Id
const getPedidoByID = async(req, res)=>{
    const {id} = req.params;
    const pedido = await Pedido.findById(id);
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({
            mensaje:'id invalido'
        })
    }
    if(!pedido){
        return res.status(404).json({
            mensaje:'pedido no encontrado'
        })
    }
    res.status(200).json({
        mensaje:'pedido encontrado',
        pedido
    })
}


// crear un pedido
// crear menu
const createPedido = async (req, res) => {
    const { usuario, fecha, menu, pedido } = req.body; 
        
    try {       

        const newPedido = new Product({
            usuario, 
            fecha,
            menu,
            pedido,
        })

        await newPedido.save()

        return res.status(201).json({
            mensaje: "Pedido creado",
            newPedido
        })

    } catch (error) {
    console.log(error)   
    }
}

// actualizar pedido
const updatePedido = async(req, res)=>{
    const {id} = req.params;
    const {usuario, fecha, menu, pedido} = req.body;
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        const pedidou = await Pedido.findByIdAndUpdate(id,{usuario, fecha, menu, pedido},{new:true})
        if(!pedidou){
            return res.status(404).json({
                mensaje:'pedido no encontrado'
            })
        }
        
        res.status(200).json({
            mensaje:'pedido actualizado',
            pedidou
        })
    } catch (error) {
        console.log(error)
    }
}

// eliminar pedido
const deletePedido = async(req, res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        const pedido = await Pedido.findByIdAndDelete(id);
        if(!pedido){
            return res.status(404).json({
                mensaje:'pedido no encontrado'
            })
        }
        res.status(200).json({
            mensaje:'pedido eliminado',
            pedido
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getPedidos,
    getPedidoByID,
    createPedido,
    updatePedido,
    deletePedido
}