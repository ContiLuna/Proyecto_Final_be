const passport = require('passport');

const authenticateAdmin = (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (err, user, info) => {
        if(err){
            return res.status(500).json({
                mensaje: "Error al autenticar el usuario",
                error: err
            })
        }
        if(!user){
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            })
        }
        if(user.rol !== "admin"){
            return res.status(401).json({
                mensaje: "Usuario no autorizado, necesitas ser administrador"
            })
        }
        req.user = user
        next();
    })(req, res, next)
}

module.exports = authenticateAdmin;