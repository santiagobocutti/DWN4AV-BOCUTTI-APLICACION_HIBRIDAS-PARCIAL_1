import Usuario from "../models/usuario_model.js"
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const ruta = express.Router()

ruta.post('/', (req, res) => {

    Usuario.findOne({ nombre_usuario: req.body.nombre_usuario})
    .then(data => {
        if(data){
            const claveCorrecta = bcrypt.compareSync(req.body.clave, data.clave)
            if(!claveCorrecta) return  res.status(400).json({msj: "La clave es incorrecta"})
            const jwToken = jwt.sign({  
                usuario: {
                    _id: data._id,
                    nombre_usuario: data.nombre_usuario,
                    nombre_completo: data.nombre_completo,
                    email: data.email
                }
        },process.env.SEED, {expiresIn: process.env.EXPIRATION})
        res.json({
            usuario: {
                _id: data._id,
                nombre_usuario: data.nombre_usuario,
                nombre_completo: data.nombre_completo,
                email: data.email
            }, jwToken
        })
        }else {
            res.status(400).json({msj: "El usuario es incorrecto"})
        }
    })
})

export default ruta;

