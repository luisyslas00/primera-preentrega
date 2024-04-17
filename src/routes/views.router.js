import { Router } from "express";
import ProductManager from "../ProductManager.js"
const path = './database.json'
const productManager = new ProductManager(path)
const router = Router()

router.get("/",async(req,res)=>{
    try{
        const products = productManager.getProducts()
        const productsDB = await products
        res.render("home",{
            title:'Inicio | Tienda',
            productsExiste:productsDB.length!==0,
            productsDB,
            styles:'styles.css'
        })
    }
    catch(error){
        console.log(error)
    }
})


//websocket
// router.get('/realtimeproducts',async(req,res)=>{
//     try{
//         res.render('realTimeProducts',{
//             styles: 'styles.css'
//         })
//     }
//     catch(error){
//         console.log(error)
//     }
// })
router.get('/realtimeproducts',async(req,res)=>{
    try{
        // const products = productManager.getProducts()
        // const productsDB = await products
        // const {io} = req.io
        // console.log(io)
        // io.on('connection',socket=>{
        //     console.log('Cliente conectado')
        //     socket.on('addProduct',data=>{
        //         console.log(data.newProduct)
        //     })
        // })
        
        res.render('realTimeProducts',{
            styles: 'styles.css'
        })
    }
    catch(error){
        console.log(error)
    }
})


export default router