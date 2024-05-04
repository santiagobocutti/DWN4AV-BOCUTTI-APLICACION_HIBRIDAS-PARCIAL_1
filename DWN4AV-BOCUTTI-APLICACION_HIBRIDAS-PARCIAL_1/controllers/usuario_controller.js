import Usuario from "../models/usuario_model.js"
import bcrypt from "bcrypt"

//LISTA COMPLETA DE USUARIOS
async function getUsuario(){
        let usuario = await Usuario.find();
        return usuario;
    }

//CREAR UN NUEVO USUARIO
async function createUsuario(body){
    let usuarioNuevo = new Usuario({
        nombre_usuario:  body.nombre_usuario,
        nombre_completo: body.nombre_completo,
        clave: bcrypt.hashSync(body.clave, 10),
        email:  body.email,
    })
    return await usuarioNuevo.save();
}

//ACTUALIZAR DATOS
async function updateUsuario(id, body){
    let usuarioActualizado = await Usuario.findByIdAndUpdate(id, {
        $set: {
            nombre_usuario:  body.nombre_usuario,
            nombre_completo: body.nombre_completo,
            clave: body.clave,
            email:  body.email,
        }
    }, {new: true})
    return usuarioActualizado;
}


export {getUsuario, createUsuario, updateUsuario,};