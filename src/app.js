import express from "express"
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars'

const app = express()

//Dos comandos importantes
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Carpeta estática
app.use(express.static(__dirname+'/public'))

//Configuración motor de plantilla
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

//Products
app.use('/api/products',productsRouter)
//Cart
app.use('/api/carts',cartsRouter)
//Views
app.use('/',viewsRouter)


app.listen(8080,error=>{
    if(error) return console.log(error)
    console.log("Server escuchando")
})