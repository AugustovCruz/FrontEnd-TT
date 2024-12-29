let productsCarritoLS = JSON.parse(localStorage.getItem("productsCart"))
const productCart = document.querySelector("#cart-products")
let buttonDelet = document.querySelectorAll(".trash")



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
                        <p>Precio:</p>
                        <p>Stock:</p>
                    </section>
                    <section class="product-item">
                        <p>Cantidad</p>
                        <div class="btn-cart">
                            <button>-</button> <span>1</span> <button>+</button>
                        </div>
                    </section>
                    <section class="trash">
                        <button> 🗑 </button>
                    </section>
        `
        productCart.appendChild(div)
    });
    updateButtonDelet ()
}

productosCarrito()

function updateButtonDelet () {
    buttonDelet = document.querySelectorAll(".trash")

    buttonDelet.forEach(btn=> {
        btn.addEvenListener("click", DeletToCart)
    })
}

function DeletToCart(e) {
    const idButton = e.currentTarget.id
    const productDelet = productsCarritoLS.find(prod => prod.id == idButton)
    console.log(productDelet)
}
