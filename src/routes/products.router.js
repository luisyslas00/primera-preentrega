import { Router } from 'express'
import ProductManager from "../ProductManager.js"
const path = './database.json'

const productManager = new ProductManager(path)
const router = Router()

//Configuración

//Se muestran los productos en la ruta '/products', además se trabaja con query ?limit
router.get('/',async (req,res)=>{
    try{
        const products = productManager.getProducts()
        const productsDB = await products
        const {limit} = req.query
        if(limit<productsDB.length){
            const productsFilter = productsDB.slice(0,Number(limit))
            return res.send(productsFilter)
        }
        res.send(productsDB)
    }
    catch(error){
        console.log(error)
    }
}
)
//Ver producto por ID
router.get('/:pid',async(req,res)=>{
    try{
        const {pid} = req.params
        const products = productManager.getProducts()
        const productsDB = await products
        console.log(productsDB)
        const productFound = productsDB.find(prod=>prod.id === Number(pid))
        if(!productFound) return res.status(404).send({status:'error',error:'Product not found'})
        res.send({status:'success',payload:productFound})
    }
    catch(error){
        console.log(error)
    }
})
//Agregar producto
router.post('/',async (req,res,next)=>{
    try{
        const result = await productManager.addProduct(req.body)
        if(result.status === 'failed')return res.send(result)
        res.send({status:"success",payload:result})
    }
    catch(error){
        console.log(error)
    }
})
//Modificar producto
router.put('/:pid',async(req,res)=>{
    try{
        const {pid} = req.params
        const result = await productManager.updateProduct(Number(pid),req.body)
        if(result.status === 'failed') return res.send(result)
        res.send({status:'success',payload:result})
    }
    catch(error){
        console.log(error)
    }
})
//Eliminar producto
router.delete('/:pid',async(req,res)=>{
    try{
        const {pid} = req.params
        productManager.deleteProduct(Number(pid))
        const products = productManager.getProducts()
        const productsDB = await products
        const productsFilter = productsDB.filter(prod=>prod.id!==Number(pid))
        res.send({status:'success',payload:productsFilter})
    }
    catch(error){
        console.log(error)
    }
})

export default router