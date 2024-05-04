import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import camisetas_route from "./routes/producto_route.js"
import clubes_route from "./routes/club_route.js"
import usuarios_route from "./routes/usuario_route.js"
import auth from "./routes/auth.js"


mongoose
    .connect(process.env.MONGO_URL) 
    .then(() => console.log("Conectado"))
    .catch(() => console.log("Error al intentar conectar"))


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/camisetas", camisetas_route)
app.use("/clubes", clubes_route)
app.use("/usuarios", usuarios_route)
app.use("/iniciar_sesion", auth)


const port = process.env.PORT || 3002
app.listen(port)