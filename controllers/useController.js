const User = require('../models/UserSchema')
const mongoose = require('mongoose');
const {encryptPassword, comparePassword} = require('../utils/passwordencript') // asi se importa en node usando require
const jwt = require("jsonwebtoken"); // importo jwt para generar token

const getAllUSers = async(req, res)=>{ // trae todos los usuarios


    const users = await User.find();
    try {
        if(!users){
            return res.status(404).json({
                mensaje:'no se encontro usuario',
                status:404
            })
        }
        return res.status(200).json({
            mensaje:'usuarios encontrados',
            status:200,
            users
        })
    } catch (error) {
        return res.status(500).json({
            error, 
            mensaje:'error en el servidor',
        })
    }
}

const getUserByID = async(req, res)=>{ // trae un usuario por id

    const {id} = req.params;
    const user = await User.findById(id);

    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({
            mensaje:'id invalido'
        })
    }
    if(!user){
        return res.status(404).json({
            mensaje:'usuario no encontrado'
        })
    }
    res.status(200).json({
        mensaje:'usuario encontrado',
        user
    })
}

//crear un usuario y registro
const createUser = async(req, res)=>{

    const {nombre, email, password} = req.body;

    const user = await User.findOne({email})

    try {
        if(user){
            return res.status(400).json({
                mensaje:'usuario ya existe'
            })
        }

        const newUser = new User({
            nombre,
            email, 
            password:encryptPassword(password) // encripto la password
        })
        //creo instancia de mi base de datos
        // const userDB = 
        await newUser.save(); // lo guarda enn la base de datos
        res.status(200).json({
            mensaje:'usuario creado',
            user:newUser
        }) // si todo sale bien

    } catch (error) {
        console.log(error)
    }


}


const deleteUser = async(req, res)=>{
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        if(!user){
            return res.status(404).json({
                mensaje:'usuario no encontrado'
            })
        }
        res.status(200).json({
            mensaje:'usuario eliminado',
        })
    } catch (error) {
        console.log(error)
    }

}

//editar usuario por id
const updateUser = async(req, res)=>{
    const {id} = req.params;
    const {nombre, email, password} = req.body;  

    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({
                mensaje:'id invalido'
            })
        }
        const user = await User.findByIdAndUpdate(id,{nombre, email, password},{new:true})
        if(!user){
            return res.status(404).json({
                mensaje:'usuario no encontrado'
            })
        }
        
        res.status(200).json({
            mensaje:'usuario actualizado',
            user
        })
    } catch (error) {
        console.log(error)
    }
}

//inciar sesion usuario

const login = async (req, res) => {
    //tomaos los daros del body, inputs
    const { email, password } = req.body;
    //buscamos el usuario en nuestra base de datos
    const user = await User.findOne({email});
    //guardamos el secret para nuestro JWT en una variable
    const secret = process.env.JWT_SECRET;
    try {
      //validar si el usuario existe, si el usuario no exite, se retorna usuario no encontrado
      if(!user) {
        return res.status(404).json({
          mensaje: "usuario no encontrado"
        })
      }
  
      //vamos a comprar las contrasenas ingresada desde el login con la contrasena guardada en la base datos que ya esta encriptada
      //si esto es false, mostrara mensaje contrasena incorrecta, si es true, pasa a la variable payload
      if(!comparePassword(password, user.password)){
        return res.status(400).json({
          mensaje: "la contraseña es incorrecta"
        })
      }
      //payload es la data que nosotros vamos a divulgar o enviar a nustro FE, para realizar validaciones
      const payload = {
        sub: user._id,
        email: user.email,
        nombre: user.nombre
      }
  
      //aqui generamos nuestro token, el cual recibe 3 parametros, el primero, es el payload o data, el segundo es el secret,
      //y el tercer parametro es el algoritmo de codificacion del token
      const token = jwt.sign(payload, secret, {
        algorithm: process.env.JWT_ALGORTIHM
      });
  
      console.log("token", token)
      //en el caso de ser un logueo exitoso, devolvemos un mensaje de exito, el token y el user
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

