import express from "express"
import { createClub, getClub, updateClub } from "../controllers/club_controller.js";
import verificarClave from "../middlewares/verificar_auth.js";


const ruta = express.Router();


ruta.get("/", (req, res) => {
    let resultado = getClub();
    resultado
        .then((club) => { res.status(200).json(club) })
        .catch((error) => { res.status(400).json(error) })
})

ruta.post("/", (req, res) => {
    let body = req.body;
    let resultado = createClub(body);
    resultado
        .then((club) => { res.status(201).json(club) })   
        .catch((error) => { res.status(400).json(error) })
})

ruta.put("/:id", verificarClave, (req, res) => {
     let body = req.body;
     let resultado = updateClub(req.params.id, body);
     resultado
         .then((club) => { res.status(201).json(club) })
         .catch((error) => { res.status(400).json(error) })
 })


export default ruta;