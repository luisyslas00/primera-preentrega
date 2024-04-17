import express from "express"
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { productSocket } from "./utils/productsSocket.js"


const app = express()

const PORT = process.env.PORT || 8080

//Dos comandos importantes
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Carpeta estática
app.use(express.static(__dirname+'/public'))

//Configuración motor de plantilla
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

// Configuración Socket

const httpServer = app.listen(PORT,error=>{
    if(error) return console.log(error)
    console.log("Server escuchando")
})

const io = new Server(httpServer)

// middleware
app.use(productSocket(io))
//Products
app.use('/api/products',productsRouter)
//Cart
app.use('/api/carts',cartsRouter)
//Views
app.use('/',viewsRouter)


//Modo escucha
// Desafio - No encontré manera de resolverlo
import ProductManager from "./ProductManager.js"
const path = './database.json'

const productManager = new ProductManager(path)

io.on('connection',async socket=>{
    console.log('Cliente conectado')
    socket.on('addProduct',async data=>{
        await productManager.addProduct(data.newProduct)
        const products = productManager.getProducts()
        const productsDB = await products
        socket.emit("listaProductos",{productsDB})
    })
    socket.on('productEliminar',async data=>{
        await productManager.deleteProduct(Number(data.id))
        const products = productManager.getProducts()
        const productsDB = await products
        socket.emit("listaProductos",{productsDB})
    })
})
