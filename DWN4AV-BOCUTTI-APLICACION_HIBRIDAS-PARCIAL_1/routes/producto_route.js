import express from "express"
import { createProducto,desactivateProducto, getProductosDisponibles, getProductosMayorPrecio,getProductosMenorPrecio, getProductosNoDisponibles, searchId, searchPais, updateProducto, searchMarca } from "../controllers/producto_controller.js";
import Joi from "joi"
import verificarClave from "../middlewares/verificar_auth.js";

const ruta = express.Router(); 

const schema = Joi.object({
    año: Joi.number()
            .min(1900)
            .max(2024)
            .required(),
    detalle: Joi.string()
                .max(1000),  
    precio: Joi.number()
                .min(1000)
                .max(999999)
                .required(),    
})

ruta.get("/", (req, res) => {
    let resultado = getProductosDisponibles();
    req.usuario
    resultado
        .then((producto) => { res.status(200).json(producto) })
        .catch((error) => { res.status(400).json(error) })
})

ruta.get("/faltantes", (req, res) => {
    let resultado = getProductosNoDisponibles();
    resultado
        .then((producto) => { res.status(200).json(producto) })
        .catch((error) => { res.status(400).json(error) })
})

ruta.get("/mayor_precio", (req, res) => {
    let resultado = getProductosMayorPrecio();
    resultado
        .then((producto) => { res.status(200).json(producto) })
        .catch((error) => { res.status(400).json(error) })
})

ruta.get("/menor_precio", (req, res) => {
    let resultado = getProductosMenorPrecio();
    resultado
        .then((producto) => { res.status(200).json(producto) })
        .catch((error) => { res.status(400).json(error) })
})

ruta.post("/:id", (req, res) => {
    let body = req.body
    const {error, value} = schema.validate({año: body.año, detalle: body.detalle, precio: body.precio})
    if(!error){
    let resultado = createProducto(req);
    resultado
        .then((producto) => { res.status(201).json(producto) })
        .catch((err) => { res.status(400).json(err) })
    }else {
        res.status(400).json(error) 
    }
})

ruta.put("/:id", verificarClave, (req, res) => {
    let body = req.body;
    let resultado = updateProducto( req.params.id, body);
    resultado
        .then((producto) => { res.status(201).json(producto) })
        .catch((error) => { res.status(400).json(error) })
})

ruta.put("/buscar_id/:id", (req, res) => {
    let resultado = searchId(req.params.id);
    resultado
        .then((producto) => { res.status(200).json(producto) })
        .catch((error) => { res.status(400).json(error) })
})

ruta.put("/buscar_pais/:pais", (req, res) => {
    let resultado = searchPais(req.params.pais);
    resultado
        .then((producto) => { res.status(200).json(producto) })
        .catch((error) => { res.status(400).json(error) })
})

 ruta.put("/buscar_marca/:marca", (req, res) => {
     let resultado = searchMarca(req.params.marca);
     resultado
         .then((producto) => { res.status(200).json(producto) })
         .catch((error) => { res.status(400).json(error) })
 })

 ruta.delete("/:id", verificarClave, (req, res) => {
     let body = req.body;
     let resultado = desactivateProducto(req.params.id, body);
     resultado
        .then((producto) => { res.status(201).json(producto) })
         .catch((error) => { res.status(400).json(error) })
 })

export default ruta;
