//modelo base de datos schema de usuario
const mongoose =  require('mongoose')

const USerSchema = new mongoose.Schema({
    nombre:{
        type:String, 
        require:true,
        trim:true
    },
    email:{ // validacion de email
        type:String, 
        require:true,
        trim:true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            },
    password:{ // validacion de password con longitud minima de 8 caracteres, al menos una letra y un numero
        type: String,
        required: true,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        minlength: 8

    },
    estado:{ // validacion de estado, true (Activo) o false (inactivo)
        type:Boolean,
        default:true,
        enum:[true, false]
    },
    rol:{
        type:String,
        default:'user',
        enum:['user', 'admin']
    }
})

const User = mongoose.model('User', USerSchema);

module.exports = User;