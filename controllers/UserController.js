const User = require('../models/UserSchema');
const mongoose = require('mongoose');
const { encryptPassword, comparePassword } = require('../utils/passwordHandler');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Traer todos los usuarios
const getAllUsers = async (req,res) => {
    const users = await User.find();
    try {
        if(!users){
            return res.status(404).json({
                message: "No hay usuarios creados",
                status: 404
            })
        }
        return res.status(200).json({
            message: "Usuarios encontrados",
            status: 200,
            users
        })
    } catch (error) {
        console.log(error)
    }
}

//Buscar usuario segun ID

const getUserById = async (req,res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({
            message: "Id no valido"
        })
    }
    if(!user){
        return res.status(200).json({
            mensaje: "Usuario encontrado",
            user
        })
    }
}

//Crear un usuario

const register = async (req,res) => {
    const {nombre, email, password} = req.body;
    const user = await User.findOne({email});
    try {
        if(user){
            return res.status(404).json({
                message:"El usuario ya existe"
            })
        }

        const newUser = new User({
            nombre,
            email,
            password: encryptPassword(password)
        });
        await newUser.save();

        res.status(201).json({
            mensaje: "usuario creado",
            user: newUser,
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    register,
    
}