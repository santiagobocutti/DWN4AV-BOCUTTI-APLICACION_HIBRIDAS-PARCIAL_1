import Club from "../models/club_model.js"

//LISTA COMPLETA DE CLUBES
async function getClub(){
        let club = await Club.find();
        return club;
    }

//CREAR UN NUEVO CLUB
async function createClub(body){
    let clubNuevo = new Club({
        nombre:  body.nombre,
        detalle: body.detalle,
        imagen:  body.imagen,
    })
    return await clubNuevo.save();
}

//ACTUALIZAR DATOS
async function updateClub(id, body){
    let clubActualizado = await Club.findByIdAndUpdate(id, {
        $set: {
            nombre:  body.nombre,
            detalle: body.detalle,
            imagen:  body.imagen,
        }
    }, {new: true})
    return clubActualizado;
}


export {getClub, createClub, updateClub};

