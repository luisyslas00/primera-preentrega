import { Router } from 'express'
import fs from 'fs'
const pathCart = './carts.json'
import ProductManager from "../ProductManager.js"
const path = './database.json'

const productManager = new ProductManager(path)
const router = Router()

//Configuración

async function leerArchivo(){
    try{
        let archivoJSON = await fs.promises.readFile(pathCart,'utf-8')
        const carts = JSON.parse(archivoJSON)
        return carts
    }
    catch{
        return []
    }
}
async function guardarArchivo(carts){
    try{
        await fs.promises.writeFile(pathCart,JSON.stringify(carts,null,'\t'),'utf-8')
    }
    catch(error){
        console.log(error)
    }
}

//Creando cart
router.post('/',async(req,res)=>{
    const carts = await leerArchivo()
    const cart = {
        "id":carts.length+1,
        "products":[]
    }
    carts.push(cart)
    guardarArchivo(carts)
    res.send({status:"success",payload:cart})
})

//Leer cada carrito
router.get('/:cid',async (req,res)=>{
    try{
        const {cid} = req.params
        const cartsDB = await leerArchivo()
        const searchCart = cartsDB.find(el=>el.id===Number(cid))
        if(!searchCart) return res.status(404).send({status:"error",error:"Los productos no fueron encontrados"})
        const {products} = searchCart
        res.send(products)
    }
    catch(error){
        console.log(error)
    }
})

router.post('/:cid/product/:pid',async(req,res)=>{
    try{
        const {cid,pid} = req.params
        const myProducts = {
            id:Number(pid),
            quantity:1
        }
        const cartsDB = await leerArchivo()
        const searchCart = cartsDB.find(el=>el.id===Number(cid))
        if(!searchCart) return res.status(404).send({status:"error",error:"Carrito no encontrado"})
        const {products} = searchCart
        const searchProduct = products.find(el=>el.id===Number(pid))
        if(searchProduct){
            searchProduct.quantity +=1
        }else{
            products.push(myProducts)
        }
        console.log(cartsDB)
        guardarArchivo(cartsDB)
        res.send({status:"success",payload:products})
    }
    catch(error){
        console.log(error)
    }
})

export default router

// import { Router } from 'express'

// const router = Router()

// //Configuración

// router.post('/',(req,res)=>{
//     res.send("Creando carrito")
// })

// router.get('/:cid',(req,res)=>{
//     res.send("Productos que contengan el id del carrito elegido")
// })

// router.post('/:cid/product/:pid',(req,res)=>{
//     res.send("Agregar producto al carrito elegido")
// })

// export default router