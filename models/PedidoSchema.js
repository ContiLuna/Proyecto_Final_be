const mongoose =  require('mongoose')
const User = require('./UserSchema')
const Menu = require('./MenuSchema')

const PedidoSchema = new mongoose.Schema({
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    },
    fecha:{
        type:Date,
        default:Date.now,
    },
    menu:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Menu,
        }
    ],
    estado:{
        type:String,
        default:'pendiente',
        enum:['pendiente', 'confirmado', 'cancelado']
    },
    monto:{
        type:Number
    }
})

const Pedido = mongoose.model('Pedido', PedidoSchema);
module.exports = Pedido;