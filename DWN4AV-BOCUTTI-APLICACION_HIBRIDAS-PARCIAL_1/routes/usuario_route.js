import express from "express"
import { createUsuario, getUsuario, updateUsuario } from "../controllers/usuario_controller.js";
import verificarClave from "../middlewares/verificar_auth.js";

const ruta = express.Router();


ruta.get("/", (req, res) => {
    let resultado = getUsuario();
    resultado
        .then((usuario) => { res.status(200).json(usuario) })
        .catch((error) => { res.status(400).json(error) })
})


ruta.post("/", (req, res) => {
    let body = req.body;
    let resultado = createUsuario(body);
    resultado
        .then((usuario) => { res.status(201).json(usuario) })   
        .catch((error) => { res.status(400).json(error) })
})

ruta.put("/:id", verificarClave, (req, res) => {
    let body = req.body;
    let resultado = updateUsuario(req.params.id, body);
    resultado
        .then((usuario) => { res.status(201).json(usuario) })
        .catch((error) => { res.status(400).json(error) })
})


export default ruta;