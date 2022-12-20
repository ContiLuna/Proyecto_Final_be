const User = require('../models/UserSchema')
const mongoose = require('mongoose');
const { encryptPassword, comparePassword } = require('../utils/passwordencript');
const jwt = require("jsonwebtoken");

const getAllUSers = async (req, res) => {


    const users = await User.find();
    try {
        if (!users) {
            return res.status(404).json({
                mensaje: 'no se encontro usuario',
                status: 404
            })
        }
        return res.status(200).json({
            mensaje: 'usuarios encontrados',
            status: 200,
            users
        })
    } catch (error) {
        return res.status(500).json({
            error,
            mensaje: 'error en el servidor',
        })
    }
}

const getUserByID = async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            mensaje: 'id invalido'
        })
    }
    if (!user) {
        return res.status(404).json({
            mensaje: 'usuario no encontrado'
        })
    }
    res.status(200).json({
        mensaje: 'usuario encontrado',
        user
    })
}

const createUser = async (req, res) => {

    const { nombre, email, password, rol } = req.body;

    const user = await User.findOne({ email })

    try {
        if (user) {
            return res.status(400).json({
                mensaje: 'usuario ya existe'
            })
        }

        const newUser = new User({
            nombre,
            email,
            password: encryptPassword(password),
            rol
        })
        await newUser.save();
        res.status(200).json({
            mensaje: 'usuario creado',
            user: newUser
        })

    } catch (error) {
        console.log(error)
    }


}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                mensaje: 'id invalido'
            })
        }
        if (!user) {
            return res.status(404).json({
                mensaje: 'usuario no encontrado'
            })
        }
        res.status(200).json({
            mensaje: 'usuario eliminado',
        })
    } catch (error) {
        console.log(error)
    }

}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                mensaje: 'id invalido'
            })
        }
        const user = await User.findByIdAndUpdate(id, { nombre, email, password }, { new: true })
        if (!user) {
            return res.status(404).json({
                mensaje: 'usuario no encontrado'
            })
        }

        res.status(200).json({
            mensaje: 'usuario actualizado',
            user
        })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const secret = process.env.JWT_SECRET;
    try {
        if (!user) {
            return res.status(404).json({
                mensaje: "usuario no encontrado"
            })
        }

        if (!comparePassword(password, user.password)) {
            return res.status(400).json({
                mensaje: "la contraseña es incorrecta"
            })
        }
        
        const payload = {
            sub: user._id,
            email: user.email,
            nombre: user.nombre
        }

        const token = jwt.sign(payload, secret, {
            algorithm: process.env.JWT_ALGORTIHM
        });

        console.log("token", token)
        
        return res.status(200).json({
            mensaje: "Usuario logueado con exito",
            token,
            user
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {

    getAllUSers, // read todos los usuarios
    getUserByID, // read un usuario por id
    createUser, // create un usuario
    deleteUser, // delete un usuario
    updateUser, // update un usuario
    login // login de usuario
}

