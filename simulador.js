const contenedor = document.getElementById("contenedor")
const contenedorCat = document.getElementById("contenedorCat")


const catRopa = document.getElementById("ropa")
const catAccesorios = document.getElementById("accesorios")

const btnCarrito = document.getElementById("btnCarrito")
const contenedorCarrito = document.getElementById("contenedorCarrito")

const precioFinal = document.getElementById("precioFinal")
const contPrecioFinal = document.getElementsByClassName("precioFinal")

const botonAgr = document.getElementsByClassName('btnComprar')

let carrito = []


function mostrarProductos(array){
    contenedor.innerHTML='';
    for (const producto of array) {
        let div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML += `
                        <div class="card">
                            <div class="imagen">
                                <img src="${producto.img}" alt="">
                            </div>
                            <div class="descripcion">
                                <h4>${producto.nombre} ${producto.talle}</h4>
                                <p>$${producto.precio}</p>
                                <button id="botonAgregar${producto.id}" class="btnComprar" >Comprar</button>
                            </div>  
                        </div>
        `
    contenedor.appendChild(div);

    let btnAgregar = document.getElementById(`botonAgregar${producto.id}`)
    
    btnAgregar.addEventListener('click', ()=>{
        agregarAlCarrito(producto.id)
    })
    }
}

function agregarAlCarrito(id){
    let repetido = carrito.find(item => item.id == id)
    if (repetido){
        
        repetido.cantidad = repetido.cantidad + 1
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id=cantidad${repetido.id}>Cantidad: ${repetido.cantidad}</p>`
        actualizarCarrito()
    } else{
        let productoAgregar = stockProductos.find(elemento => elemento.id == id)
        carrito.push(productoAgregar)
        actualizarCarrito()

        let divCarrito = document.createElement('div')
        divCarrito.className = 'carrito'
        divCarrito.innerHTML += `   <p>${productoAgregar.nombre}</p>                                  
                                    <p id=cantidad${productoAgregar.id}>Cantidad: ${productoAgregar.cantidad}</p>
                                    <p>Precio: $${productoAgregar.precio}</p>
                                    <button id=botonEliminar${productoAgregar.id} class="botonEliminar">Eliminar</i></button>
        `
        contenedorCarrito.appendChild(divCarrito)

        let btnEliminar = document.getElementById(`botonEliminar${productoAgregar.id}`)
        btnEliminar.addEventListener('click', ()=>{
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id=cantidad${productoAgregar.id}>Cantidad: ${productoAgregar.cantidad}</p>`
            actualizarCarrito()
            if (productoAgregar.cantidad <=0){
                btnEliminar.parentElement.remove()
                carrito = carrito.filter(elemento => elemento.id != productoAgregar.id)
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))

}


function actualizarCarrito(){
    precioFinal.innerText = carrito.reduce((acc,el) => acc + (el.precio * el.cantidad), 0)
}


function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
    if (recuperarLS){
        recuperarLS.forEach(element => (
            agregarAlCarrito(element.id)
        ))
    }
}

recuperar()



catRopa.addEventListener('click', ()=>{
    console.log(catRopa.id)
    contenedorCat.innerHTML='';
    if(catRopa.id == 'ropa'){
        mostrarProductos(stockProductos.filter(el => el.categoria == catRopa.id))
    }
})

catAccesorios.addEventListener('click', ()=>{
    console.log(catAccesorios.id)
    contenedorCat.innerHTML='';
    if(catAccesorios.id == 'accesorios'){
        mostrarProductos(stockProductos.filter(el => el.categoria == catAccesorios.id))
    }
})
