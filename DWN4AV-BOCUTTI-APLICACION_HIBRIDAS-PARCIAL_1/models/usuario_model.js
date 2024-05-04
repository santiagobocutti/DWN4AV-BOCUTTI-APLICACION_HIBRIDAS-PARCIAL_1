import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre_usuario: {
        type: String,
        required: true
    },
    nombre_completo: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

export default mongoose.model("usuarios", usuarioSchema)