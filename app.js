const contenedor = document.getElementById("contenedor")
const contenedorCat = document.getElementById("contenedorCat")
const categorias = document.getElementById("categorias")


const catRopa = document.getElementById("ropa")
const catAccesorios = document.getElementById("accesorios")
const catCds = document.getElementById("cds")

const contenedorCarrito = document.getElementById("contenedorCarrito")
const contPrecioFinal = document.getElementsByClassName("precioFinal")


const btnModal = document.getElementById("btnModal")
const btnCerrarModal = document.getElementById("btnCerrarModal")
const btnFinalizar = document.getElementById("btnFinalizarCompra")


const email = document.getElementById('email')
const nombre = document.getElementById('nombre')
const direccion = document.getElementById('direccion')

let carrito = []
let stockProductos = []

let categoriaElegida = ''


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
        Swal.fire({
            html: '<p>Producto agregado al carrito</p>',
            toast: true,
            width: '25vw',
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false,
            background: 'rgb(0, 0, 0, 0.8)'
        })
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
            Swal.fire({
                html: '<p>Producto eliminado</p>',
                toast: true,
                width: '25vw',
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false,
                background: 'rgb(134, 134, 134, 0.2)'
            })
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


async function obtenerElementos(){
    const respuesta = await fetch ('bbdd.json')
    const data = await respuesta.json()

    stockProductos = data

    if(categoriaElegida == 'ropa'){
        mostrarProductos(stockProductos.filter(el => el.categoria == catRopa.id))
    }else if(categoriaElegida == 'accesorios'){
        mostrarProductos(stockProductos.filter(el => el.categoria == catAccesorios.id))
    }else if(categoriaElegida == 'cds'){
        mostrarProductos(stockProductos.filter(el => el.categoria == catCds.id))
    }
    categorias.classList.replace('opcionesCat', 'categoriasDos');
}


catRopa.addEventListener('click', ()=>{
    
    obtenerElementos()
    categoriaElegida = 'ropa'

})

catAccesorios.addEventListener('click', ()=>{
    obtenerElementos()
    categoriaElegida = 'accesorios'
})

catCds.addEventListener('click', ()=>{
    obtenerElementos()
    categoriaElegida = 'cds'
})


btnModal.addEventListener('click', ()=>{
    document.getElementById('finalizarCompra').style.display = ("grid")
    document.getElementById('contenedorPrincipal').style.display = ("none")
    btnModal.style.display = ("none")
})

btnCerrarModal.addEventListener('click', ()=>{
    document.getElementById('finalizarCompra').style.display = ("none")
    document.getElementById('contenedorPrincipal').style.display = ("")
    btnModal.style.display = ("")
})

btnFinalizar.addEventListener('click', ()=>{
    if (email.value === "" || nombre.value === "" || direccion.value === ""){
        Swal.fire({
            icon: 'error',
            html:  '<p>Debes rellenar los datos para el envio</p>',
            background: 'rgb(0, 0, 0, 0.8)',
            confirmButtonColor: 'rgb(134, 134, 134, 0.2)'
        })
    }else {
        Swal.fire({
            icon: 'success',
            html:  '<p>Gracias por tu compra</p>',
            background: 'rgb(0, 0, 0, 0.8)',
            showConfirmButton: false,
            confirmButtonColor: 'rgb(134, 134, 134, 0.2)',
            timer: 4000,
        })
        function cerrar (){
            localStorage.clear()
            location.reload()
        }
        setTimeout(cerrar, 4000);
        
       
    }
    
})