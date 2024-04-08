import { Router } from 'express'
const path = './carts.json'
import CartManager from '../CartManager.js'

const router = Router()
const cartManager = new CartManager(path)


//Creando cart
router.post('/',async(req,res)=>{
    try{
        const cartsDB = await cartManager.getCarts()
        const cart = {
            "id":cartsDB.length+1,
            "products":[]
        }
        cartManager.addCart(cart)
        res.send({status:"success",payload:cart})
    }
    catch(error){
        console.log(error)
    }
})

// //Leer cada carrito
router.get('/:cid',async (req,res)=>{
    try{
        const {cid} = req.params
        const cartsDB = await cartManager.getCarts()
        const searchCart = cartsDB.find(el=>el.id===Number(cid))
        if(!searchCart) return res.status(404).send({status:"error",error:"Los productos no fueron encontrados"})
        const {products} = searchCart
        res.send(products)
    }
    catch(error){
        console.log(error)
    }
})

//Agregar productos, indicando id cart y id product

router.post('/:cid/product/:pid',async(req,res)=>{
    try{
        const {cid,pid} = req.params
        const myProducts = {
            id:Number(pid),
            quantity:1
        }
        const cartsDB = await cartManager.getCarts()
        const searchCart = cartsDB.find(el=>el.id===Number(cid))
        if(!searchCart) return res.status(404).send({status:"error",error:"Carrito no encontrado"})
        const {products} = searchCart
        const searchProduct = products.find(el=>el.id===Number(pid))
        if(searchProduct){
            searchProduct.quantity +=1
        }else{
            products.push(myProducts)
        }
        cartManager.updateCart(cid,searchCart)
        res.send({status:"success",payload:products})
    }
    catch(error){
        console.log(error)
    }
})

export default router