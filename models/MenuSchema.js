// modelo base de datos schema de menu
const mongoose =  require('mongoose')

const MenuSchema = new mongoose.Schema({
    nombre:{
        type:String, 
        require:true,
        trim:true
    },
    estado:{
        type:Boolean,// validacion de estado, true (disponible) o false (no disponible)
        default:true,
        require:true,

    },
    precio:{
        type:Number, // validacion de precio, solo numeros
        require:true,
        trim:true
        
    },
    detalle:{
        type:String, // validacion de detalle, solo texto
        require:true,
        trim:true
    },
    imagen:{
        type:String,
        required:true,
    },
    categoria:{
        type:String, 
        require:true,
        trim:true
    },
    sugerido: {
        type: Boolean,
        default: false,
    }
})

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;