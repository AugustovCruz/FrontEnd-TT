let productsCarritoLS = JSON.parse(localStorage.getItem("productsCart"))
const productCart = document.querySelector("#cart-products")
let buttonDelet = document.querySelectorAll(".trash")

const btnVoid = document.querySelector("#vaciar-carrito")



function productosCarrito () {
    console.log("adentro de carrito html", productsCarritoLS)
    productCart.innerHTML =""

    productsCarritoLS.forEach(prod => {
        const div = document.createElement("div")
        div.classList.add("product-cart")
        div.innerHTML = `
                    <img src=${prod.image} alt="ropa">
                    <p>${prod.name}</p>
                    <section class="product-item">
                        <p>Precio:${prod.maxKi}</p>
                        <p>Stock:${prod.race}</p>
                    </section>
                    <section class="product-item">
                        <p>Cantidad</p>
                        <div class="btn-cart">
                            <button>-</button> <span>${prod.cantidad}</span> <button>+</button>
                        </div>
                    </section>
                    <button class="trash" id=${prod.id} > <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> </button>                    
        `
        productCart.appendChild(div)
    });
    updateButtonDelet ()
}

productosCarrito()


function updateButtonDelet () {
    buttonDelet = document.querySelectorAll(".trash")

    buttonDelet.forEach(btn=> {
        btn.addEventListener("click", DeletToCart)
    })
}

function DeletToCart(e) {
    const idButton = e.currentTarget.id
    const productDelet = productsCarritoLS.find(prod => prod.id == idButton)
    console.log(productDelet)

    const index = productsCarritoLS.findIndex(prod=> prod.id == idButton)
    productsCarritoLS.splice(index, 1)
    productosCarrito()

    localStorage.setItem("productsCart", JSON.stringify(productsCarritoLS))
    
}

btnVoid.addEventListener("click",voidCart)


function voidCart () {
    productsCarritoLS.length = 0
    console.log(productsCarritoLS)
    localStorage.setItem("productsCart",JSON.stringify(productsCarritoLS) )
    productosCarrito()
}

