const socket = io()

//Capturamos elementos
const nameProduct = document.getElementById('name')
const descriptionProduct = document.getElementById('description')
const priceProduct = document.getElementById('price')
const thumbnailProduct = document.getElementById('thumbnail')
const codeProduct = document.getElementById('code')
const stockProduct = document.getElementById('stock')
const formProduct = document.getElementById('formulario')

//Función formulario

function enviarFormulario(){
    const newProduct = {
        title:nameProduct.value,
        description:descriptionProduct.value,
        price:priceProduct.value,
        thumbnail:thumbnailProduct.value,
        code:codeProduct.value,
        stock:stockProduct.value
    }
    socket.emit('addProduct',{newProduct})
}

formProduct.addEventListener('submit',(e)=>{
    e.preventDefault()
    enviarFormulario()
    formProduct.reset()
})



