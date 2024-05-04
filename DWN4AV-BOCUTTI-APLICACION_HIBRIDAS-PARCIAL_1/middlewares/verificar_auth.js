import jwt from "jsonwebtoken"
import "dotenv/config"

let verificarClave = ( req, res, next) => {
    let clave = req.get('auth');
    jwt.verify(clave, process.env.SEED, (error, decoded) =>{
        if(error){
            res.status(400).json("Usuario no Autorizado")
        }
        req.usuario = decoded.usuario;
        next()
    })
}

export default verificarClave;