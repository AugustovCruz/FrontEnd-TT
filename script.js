

const carrito = document.querySelector("#cart")
const abrir = document.querySelector("#button-cart")
const cerrar = document.querySelector("#close")

const offProducts = document.querySelector("#main-products")
let botonAdd = document.querySelectorAll(".producto-agregar")
const numberCart = document.querySelector("#number-cart")

abrir.addEventListener("click", ()=> {
    carrito.classList.add("visible");
})

cerrar.addEventListener("click", ()=> {
    carrito.classList.remove("visible")
})


let totalProductos = []

async function fetchData (url) {
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error("No se puede acceder a la informacion del api")
        }
        const data = await response.json()
        totalProductos = data.items
        productos(totalProductos)
        console.log(totalProductos)
    } catch (error) {
        console.error('Error al realizar la solicitud fetch', error)
    }
}

fetchData("https://dragonball-api.com/api/characters")

function productos (products) {
    
    console.log("adentro de productos", products)
    offProducts.innerHTML= ""
    
    products.forEach(prod => {
        const div = document.createElement("section")
        div.classList.add("product")
        div.innerHTML= `
                        <img src=${prod.image} alt="Producto 1">
                        <h3>${prod.name}</h3>
                        <p>${prod.ki}</p>
                        <button class="producto-agregar" id=${prod.id} >Añadir al Carrito</button>
        `
        offProducts.appendChild(div)
    });
    actualizarBotones()
    console.log(botonAdd)
}

function actualizarBotones() {
    botonAdd = document.querySelectorAll(".producto-agregar")
    botonAdd.forEach( e=> {
        e.addEventListener("click", addToCart)
    })
}

let productsCart
const productsCartLS = JSON.parse(localStorage.getItem("productsCart"))
if (productsCartLS) {
    productsCart= productsCartLS
    updateNumber ()
} else productsCart= []



function addToCart(e) {

    const idBoton = e.currentTarget.id

    const productAdd = totalProductos.find(prod => {
        return prod.id == idBoton
    })

    if (productsCart.some(prod =>prod.id == idBoton)) { 
        const index = productsCart.findIndex(prod => prod.id == idBoton)
        productsCart[index].cantidad += 1
        console.log("Producto ya esta en el carrito", productsCart)
    } else {
        productsCart.push(productAdd)
        productAdd.cantidad = 1
        console.log("Producto agregado al carrito", productsCart)
    }
    updateNumber ()    
    localStorage.setItem("productsCart", JSON.stringify(productsCart))
}

function updateNumber () {
    let number = productsCart.reduce((acc, producto)=> acc + producto.cantidad, 0)
    numberCart.innerHTML = number
}



