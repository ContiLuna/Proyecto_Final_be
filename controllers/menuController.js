const Menu = require('../models/MenuSchema');
const Categoria = require('../models/CategoriaSchema');
const mongoose = require('mongoose');


const getMenu = async(req, res)=>{ // trae todos los menus
    // traer todos los menus
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


    console.log("cloudImg", cloudImg)
    console.log("req.file", req.file)
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
            image: cloudImg.secure_url,
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
    deleteMenu
}