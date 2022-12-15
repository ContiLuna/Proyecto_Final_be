//base de datos cateogria
const mongoose =  require('mongoose')

const CategoriaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    estado:{
        type:Boolean,
        default:true,
        require:true
    }
})

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;