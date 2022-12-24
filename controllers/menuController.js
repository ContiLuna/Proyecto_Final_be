const Menu = require('../models/MenuSchema');
const Categoria = require('../models/CategoriaSchema');
const mongoose = require('mongoose');
const cloudinary= require("cloudinary").v2

const getMenu = async(req, res)=>{
    const page = req.query.page || 1;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    const menus = await Menu.find().skip(skip).limit(perPage);
    try {
        if(!menus){
            return res.status(404).json({
                mensaje:'no se encontro menu',
                status:404
            })
        }
        return res.status(200).json({
            mensaje:'menus encontrados',
            status:200,
            menus
        })
    } catch (error) {
        return res.status(500).json({
            error, 
            mensaje:'error en el servidor',
        })
    }
}

const getAllMenu = async(req, res)=>{
    const menus = await Menu.find();
    try {
        if(!menus){
            return res.status(404).json({
                mensaje:'no se encontro menu',
                status:404
            })
        }
        return res.status(200).json({
            mensaje:'menus encontrados',
            status:200,
            menus
        })
    } catch (error) {
        return res.status(500).json({
            error,
            mensaje:'error en el servidor',
        })
    }
}


// traer menu por Id
const getMenuByID = async(req, res)=>{
    const {id} = req.params;
    const menu = await Menu.findById(id);

    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({
            mensaje:'id invalido'
        })
    }
    if(!menu){
        return res.status(404).json({
            mensaje:'menu no encontrado'
        })
    }
    res.status(200).json({
        mensaje:'menu encontrado',
        menu
    })
}

// crear menu
const createMenu = async (req, res) => {
    const { nombre, estado, precio, detalle, categoria } = req.body; // destructuring sin la imagen porque viene en un fil
    const { path } = req.file;                             // destructuring para obtener la ruta de la imagen 
    const menuExist = await Menu.findOne({nombre});
    const cloudImg = await cloudinary.uploader.upload(path);

    try {
        if(menuExist) {
            return res.status(400).json({
                mensaje: "producto ya existe"
            })
        }

        const newMenu = new Menu({
            nombre, 
            estado,
            precio,
            detalle,
            imagen: cloudImg.secure_url,
            categoria
        })

        await newMenu.save()

        return res.status(201).json({
            mensaje: "menu creado",
            newMenu
        })

    } catch (error) {
    console.log(error)   
    }
}

//actualizar estado del menu
const updateEstadoMenu = async(req, res)=>{
    const {id} = req.params;
    const {estado} = req.body;
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        const menu = await Menu.findByIdAndUpdate
        (id,{estado},{new:true})
        if(!menu){
            return res.status(404).json({
                mensaje:'menu no encontrado'
            })
        }

        res.status(200).json({
            mensaje:'menu actualizado',
            menu
        })
    } catch (error) {
        console.log(error)
    }
}

//poner menu en sugerido
const updateSugeridoMenu = async(req, res)=>{
    const {id} = req.params;
    const {sugerido} = req.body;
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        const menu = await Menu.findByIdAndUpdate
        (id,{sugerido},{new:true})
        if(!menu){
            return res.status(404).json({
                mensaje:'menu no encontrado'
            })
        }

        res.status(200).json({
            mensaje:'menu actualizado',
            menu
        })
    } catch (error) {
        console.log(error)
    }
}

//update menu
const updateMenu = async(req, res)=>{
    const {id} = req.params;
    const {nombre, estado,precio, detalle, categoria} = req.body; 

    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        const menu = await Menu.findByIdAndUpdate(id,{nombre, estado, precio, detalle, categoria},{new:true})
        if(!menu){
            return res.status(404).json({
                mensaje:'menu no encontrado'
            })
        }
        
        res.status(200).json({
            mensaje:'menu actualizado',
            menu
        })
    } catch (error) {
        console.log(error)
    }
}

//delete menu
const deleteMenu = async(req, res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        const menu = await Menu.findByIdAndDelete(id);
        if(!menu){
            return res.status(404).json({
                mensaje:'menu no encontrado'
            })
        }
        res.status(200).json({
            mensaje:'menu eliminado',
            menu
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getMenu,
    getMenuByID,
    createMenu,
    updateMenu,
    deleteMenu,
    updateEstadoMenu,
    updateSugeridoMenu,
    getAllMenu
}