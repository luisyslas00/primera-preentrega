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
            productsDB
        })
    }
    catch(error){
        console.log(error)
    }
})

export default router