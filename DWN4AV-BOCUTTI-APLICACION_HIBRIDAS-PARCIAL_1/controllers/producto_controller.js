import Producto from "../models/producto_model.js"


//LISTA COMPLETA DE CAMISETAS DISPONIBLES
async function getProductosDisponibles(){
    let productosDisponibles = await Producto.find({"disponible": true}).populate('club', '-_id')
    return productosDisponibles;
}


//LISTA COMPLETA DE CAMISETAS NO DISPONIBLES
async function getProductosNoDisponibles(){
    let productosNoDisponibles = await Producto.find({"disponible": false}).populate('club', '-_id')
    return productosNoDisponibles;
}

//ORDENAR POR MAYOR PRECIO
async function getProductosMayorPrecio(){
    let productosMayorPrecio = await Producto.find().sort({'precio': -1}).limit(5).populate('club', '-_id')
    return productosMayorPrecio;
}

//ORDENAR POR MENOR PRECIO 
async function getProductosMenorPrecio(){
    let productosMenorPrecio = await Producto.find().sort({'precio': 1}).limit(5).populate('club', '-_id')
    return productosMenorPrecio;
}

//BUSCAR POR ID
async function searchId(id){
    let productoId = await Producto.find({"_id": id})
    return productoId
}

//BUSCAR POR PAIS
async function searchPais(pais){
    let productoPais = await Producto.find({"pais": { $regex: pais, $options: 'i' } })
    return productoPais
}

//BUSCAR POR MARCA
async function searchMarca(marca){
     let productoMarca = await Producto.find({"marca": { $regex: marca, $options: 'i' }}).populate('club', '-_id')
     return productoMarca
 }


//CREAR UNA NUEVA CAMISETA
async function createProducto(req){
   let productoNuevo = new Producto({
        pais: req.body.pais,
        liga:  req.body.liga,
        año:  req.body.año,
        modelo:  req.body.modelo,
        marca:  req.body.marca,
        color:  req.body.color,
        detalle:  req.body.detalle,
        imagen:  req.body.imagen,
        precio:  req.body.precio,
        disponible: true,
        club: req.params.id
   })
   return await productoNuevo.save();
}

//ACTUALIZAR DATOS
async function updateProducto(id, body){

    let productoActualizado = await Producto.findByIdAndUpdate(id, {
        $set:{
            pais: body.pais,
            liga: body.liga,
            año: body.año,
            modelo: body.modelo,
            marca: body.marca,
            color: body.color,
            detalle: body.detalle,
            imagen: body.imagen,
            precio:body.precio
       }
   }, {new: true})
    
    return productoActualizado;
 }


//DESACTIVAR DATOS
async function desactivateProducto(id){
    let productoDesactivado = await Producto.findByIdAndUpdate(id, {
        $set: {
            disponible: false
        }
    }, {new: true})
    return productoDesactivado;
}




export { getProductosDisponibles,getProductosNoDisponibles,  getProductosMayorPrecio,getProductosMenorPrecio, createProducto, updateProducto, desactivateProducto, searchId, searchPais,searchMarca,}