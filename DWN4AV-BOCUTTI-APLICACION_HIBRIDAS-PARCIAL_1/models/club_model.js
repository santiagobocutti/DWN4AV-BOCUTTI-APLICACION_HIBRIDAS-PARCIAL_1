import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    }
})

export default mongoose.model("clubes", clubSchema)