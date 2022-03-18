const contenedor = document.getElementById("contenedor")
const categorias = document.getElementById("categorias")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const modalFinalizarCompra = document.getElementById('modalFinalizarCompra')
const contenedorPrincipal = document.getElementById('contenedorPrincipal')
const contenedorDescuento = document.getElementById('contenedorDescuento')

const categoriaRopa = document.getElementById("ropa")
const categoriaAccesorios = document.getElementById("accesorios")
const categoriaCds = document.getElementById("cds")

const btnModal = document.getElementById("btnModal")
const btnCerrarModal = document.getElementById("btnCerrarModal")
const btnFinalizar = document.getElementById("btnFinalizarCompra")
const btnDescuento = document.getElementById('btnDescuento')

const tituloCarrito = document.getElementById('tituloCarrito')



let carrito = []

let categoriaElegida = ''

obtenerStock()



                /* FUNCIONES */

function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
    if (recuperarLS){
        recuperarLS.forEach(element => (
            agregarAlCarrito(element.id)
        ))
    }
}

function actualizarCarrito(){
    precioFinal.innerText = carrito.reduce((acc,el) => acc + (el.precio * el.cantidad), 0)
}

async function obtenerStock(){
    const respuesta = await fetch ('bbdd.json')
    const data = await respuesta.json()
    
    stockProductos = data
    recuperar()
}

async function obtenerElementos(){
    const respuesta = await fetch ('bbdd.json')
    const data = await respuesta.json()
    
    stockProductos = data

    if(categoriaElegida == 'ropa'){
        mostrarProductos(stockProductos.filter(el => el.categoria == categoriaRopa.id))
    }else if(categoriaElegida == 'accesorios'){
        mostrarProductos(stockProductos.filter(el => el.categoria == categoriaAccesorios.id))
    }else if(categoriaElegida == 'cds'){
        mostrarProductos(stockProductos.filter(el => el.categoria == categoriaCds.id))
    }
    categorias.classList.replace('opcionesCat', 'categoriasDos');
}
                
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

        tituloCarrito.innerText = 'Productos que agregaste al carrito:'
        btnDescuento.style.display = ('flex')

        let divCarrito = document.createElement('div')
        divCarrito.className = 'carrito'
        divCarrito.id = 'carritoModal'
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
                if (carrito == ""){
                    tituloCarrito.innerText = 'Tu carrito esta vacio'
                    btnDescuento.style.display = ('none')
                }
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



                /* EVENTOS */

btnDescuento.addEventListener('click', ()=>{
    const codigoDescuento = 'descuento20'
    Swal.fire({
        html:  '<p class="tituloDescuento">Ingresa tu codigo de descuento</p>',
        input: 'text',
        showCancelButton: true,        
        background: 'rgb(0, 0, 0, 0.8)',
        confirmButtonColor: 'rgb(134, 134, 134, 0.2)',
        confirmButtonText: 'Aplicar',
        cancelButtonColor: 'rgb(134, 134, 134, 0.2)',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.value == codigoDescuento) {
            let descuentoAAplicar = carrito.reduce((acc,el) => acc + (el.precio * el.cantidad)*(0.1), 0)
            let precioSinDescuento = carrito.reduce((acc,el) => acc + (el.precio * el.cantidad), 0)
            precioFinal.innerText = precioSinDescuento - descuentoAAplicar
            Swal.fire({
                icon: 'success',
                html:  '<p>Aplicamos tu descuento!</p>',
                background: 'rgb(0, 0, 0, 0.8)',
                confirmButtonColor: 'rgb(134, 134, 134, 0.2)'
            })
        }else{
            Swal.fire({
                icon: 'error',
                html:  '<p>Codigo incorrecto</p>',
                background: 'rgb(0, 0, 0, 0.8)',
                confirmButtonColor: 'rgb(134, 134, 134, 0.2)'
            })
        }
    });
})

categoriaRopa.addEventListener('click', ()=>{
    obtenerElementos()
    categoriaElegida = 'ropa'
})

categoriaAccesorios.addEventListener('click', ()=>{
    obtenerElementos()
    categoriaElegida = 'accesorios'
})

categoriaCds.addEventListener('click', ()=>{
    obtenerElementos()
    categoriaElegida = 'cds'
})


btnModal.addEventListener('click', ()=>{
    obtenerElementos()
    modalFinalizarCompra.style.display = ("grid")
    contenedorPrincipal.style.display = ("none")
    btnModal.style.display = ("none")

    
})

btnCerrarModal.addEventListener('click', ()=>{
    categorias.classList.replace('categoriasDos', 'opcionesCat');
    contenedor.innerHTML='';
    modalFinalizarCompra.style.display = ("none")
    contenedorPrincipal.style.display = ("")
    btnModal.style.display = ("")
})


btnFinalizar.addEventListener('click', ()=>{
    const email = document.getElementById('email')
    const nombre = document.getElementById('nombre')
    const direccion = document.getElementById('direccion')
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
        function cerrar(){
            localStorage.clear()
            categorias.classList.replace('categoriasDos', 'opcionesCat');
            contenedor.innerHTML='';
            modalFinalizarCompra.style.display = ("none")
            contenedorPrincipal.style.display = ("")
            btnModal.style.display = ("")
            document.getElementById('contenedorCarrito').innerHTML = ''
            carrito = []
            actualizarCarrito()
            nombre.value = ''
            email.value = ''
            direccion.value = ''
        }
        setTimeout(cerrar, 4000);
    }
})

 