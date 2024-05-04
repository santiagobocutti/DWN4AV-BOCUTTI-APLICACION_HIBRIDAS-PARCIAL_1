import mongoose from "mongoose"

const Schema = mongoose.Schema;


const productoSchema = new mongoose.Schema({
    club: {
        type: Schema.Types.ObjectId, ref: 'clubes'
    },
    pais: {
        type: String,
        required: true
    },
    liga: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: false
    },
    imagen: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model("camisetas", productoSchema)