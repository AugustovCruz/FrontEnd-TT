

const carrito = document.querySelector("#cart")
const fondo = document.querySelector(".background")
const abrir = document.querySelector("#button-cart")
const cerrar = document.querySelector("#close")

const offProducts = document.querySelector("#main-products")
let botonAdd = document.querySelectorAll(".producto-agregar")
const numberCart = document.querySelector("#number-cart")

abrir.addEventListener("click", ()=> {
    carrito.classList.add("visible");
    fondo.classList.add("background")
    fondo.classList.add("background-visible")
})

cerrar.addEventListener("click", ()=> {
    carrito.classList.remove("visible")
    fondo.classList.remove("background")
})


let totalProductos = []

//Consumiendo el api y cargando los productos
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
    
    offProducts.innerHTML= ""
    
    products.forEach(prod => {
        const div = document.createElement("section")
        div.classList.add("product")
        div.innerHTML= `
                        <img src=${prod.image} alt=${prod.name}>
                        <h3>${prod.name}</h3>
                        <p>${prod.ki}</p>
                        <button class="producto-agregar" id=${prod.id} >Añadir al Carrito</button>
        `
        offProducts.append(div)
    });
    actualizarBotones()
}

//Actualizo los botones de agregar para que no se pierdan
function actualizarBotones() {
    botonAdd = document.querySelectorAll(".producto-agregar")
    botonAdd.forEach( e=> {
        e.addEventListener("click", addToCart)
    })
}

//Verifico si hay products en el LS en caso contrario inicializo el carrito
let productsCart
const productsCartLS = JSON.parse(localStorage.getItem("productsCart")) 
if (productsCartLS) {
    productsCart= productsCartLS
    updateNumber ()
} else {
    productsCart= []
} 



//Funcion para agregar al carrito en un nuevo array
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

//Controlo la cantidad de productos que se van sumando al carrito
function updateNumber () {
    let number = productsCart.reduce((acc, producto)=> acc + producto.cantidad, 0)
    numberCart.innerHTML = number
}

//Manejo de categorias
const buttonCategory = document.querySelectorAll(".boton-categoria")

buttonCategory.forEach( btn=>{
    btn.addEventListener("click", (e)=> {
        //evitar que se recargue la pagina
        e.preventDefault()
        
        if (e.currentTarget.id != "Todos") {
            const productsCurrent = totalProductos.filter(prod => prod.race == e.currentTarget.id)
            productos(productsCurrent)
            actualizarBotones()
        } else productos(totalProductos)
    })
})





