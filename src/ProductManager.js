import fs from "fs"
const path = './database.json'

export default class ProductManager{
    #products
    constructor(path){
        this.#products = []
        this.path = path
    }
    async addProduct(objeto){
        try{
            this.#products = await this.leerArchivo()
            const product = {
                id:this.#agregarId(),
                title:objeto.title,
                description:objeto.description,
                price:objeto.price,
                thumbnail:objeto.thumbnail,
                status:true,
                code:objeto.code,
                stock:objeto.stock
            }
            const {title,description,price,thumbnail,code,stock} = product
            if(title===""||description===""||price===0||thumbnail===""||code===""||stock===0){
                console.log("Rellenar correctamente los campos")
                return "Rellenar correctamente los campos"
            }
            let repite = this.#products.some(elemento=>{
                return elemento.code === code
            })
            if(repite){
                console.log("Código repetido")
                return "Código repetido"
            }else{
                this.#products.push(product)
                this.writeFile()
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async getProducts(){
        try{
            this.#products = await this.leerArchivo()
            return this.#products
        }
        catch(error){
            console.log(error)
        }
    }
    async getProductById(identificador){
        try{
            this.#products = await this.leerArchivo()
            let buscar= this.#products.find(elemento =>{
                return elemento.id === identificador
            })
            if(buscar){
                console.log(buscar)
            }else{
                console.log("Not Found")
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async updateProduct(id,objeto){
        try{
            this.#products = await this.leerArchivo()
            let existeProducto = this.#products.find(producto=>{
                return producto.id === id
            })
            if(existeProducto){
                const {id,title,description,price,thumbnail,code,stock}= objeto
                let nuevoProducto = {
                    id:existeProducto.id,
                    title:title||existeProducto.title,
                    description:description||existeProducto.description,
                    price:price||existeProducto.price,
                    thumbnail:thumbnail||existeProducto.thumbnail,
                    code:code||existeProducto.code,
                    stock:stock||existeProducto.stock
                }
                let buscarProducto = this.#products.findIndex(elemento=>{
                    return elemento.id === existeProducto.id
                })
                this.#products[buscarProducto] = nuevoProducto
                this.writeFile()
            }else{
                console.log("Producto con ID inexistente")
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async deleteProduct(identificador){
        try{
            this.#products = await this.leerArchivo()
            let indexProduct = this.#products.findIndex(elemento=>{
                return elemento.id === identificador
            })
            if(indexProduct!==-1){
                this.#products.splice(indexProduct,1)
                this.writeFile()
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async writeFile(){
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.#products,null,'\t'),'utf-8')
            console.log("Archivo guardado")
        }
        catch(error){
            console.log("Error")
        }
    }
    async leerArchivo(){
        try{
            let archivoJSON = await fs.promises.readFile(this.path,'utf-8')
            this.#products = JSON.parse(archivoJSON)
            return this.#products
        }
        catch(error){
            return []
        }
    }
    #agregarId(){
        if(this.#products.length ===0){
            return 1
        }
        return this.#products.at(-1).id + 1
    }
}

const product = new ProductManager(path)