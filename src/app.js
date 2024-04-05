import express from "express"
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

const app = express()

//Dos comandos importantes
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//localhost:8080
app.get("/",(req,res)=>{
    res.send("Ecommerce Luis Yslas")
})
//Products
app.use('/api/products',productsRouter)
//Cart
app.use('/api/carts',cartsRouter)


app.listen(8080,error=>{
    if(error) return console.log(error)
    console.log("Server escuchando")
})