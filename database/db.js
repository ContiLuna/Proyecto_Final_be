const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.set('strictQuery', false); //Parametro
        await mongoose.connect(process.env.CONNECT_DB, {
            dbName: "proyectoFinal",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Base de Datos Conectada")
    } catch (error) {
        console.log(error)
        process.exit(1) //detiene la ejecucion de la app.
    }
}

module.exports = conectarDB;