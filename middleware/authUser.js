const passport = require('passport');

const authenticateUser = (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (err, user, info) => {
        if(err){
            return res.status(500).json({
                mensaje: "Error al autenticar el usuario",
                error: err
            })
        }
        if(!user){
            return res.status(404).json({
                mensaje: "usuario no encontrado"
            })
        }
        req.user = user
        next();
    })(req, res, next)
}

module.exports = authenticateUser;