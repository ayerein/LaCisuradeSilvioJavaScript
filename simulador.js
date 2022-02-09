const contenedor = document.getElementById("contenedor")
const contenedorCat = document.getElementById("contenedorCat")

const catRopa = document.getElementById("ropa")
const catAccesorios = document.getElementById("accesorios")

const btncarrito = document.getElementById("btnCarrito")


let botonAgr = document.getElementsByClassName('btnComprar')

let carrito = []
let precioFinal = 0



function mostrarProductos(array){
    contenedor.innerHTML='';
    array.forEach(producto => {
        
        let div = document.createElement('div')
        div.className = 'producto'
        div.innerHTML += `<div class="card">
                            <div class="imagen">
                                <img src="img/img.jpg" alt="">
                            </div>
                            <div class="descripcion">
                                <h4>${producto.nombre} ${producto.talle}</h4>
                                <button id="${producto.id}" class="btnComprar" >comprar</button>
                            </div>  
                        </div>
                        `
        contenedor.appendChild(div)

    });
}

function mostrarCarrito(){
    contenedor.innerHTML='';
    
    let divCarrito = document.createElement('div')
    divCarrito.className = 'carrito'
    divCarrito.innerHTML += `
    <p>El precio total del carrito es de $${precioFinal}</p>
    `
    contenedor.appendChild(divCarrito)
}




catRopa.addEventListener('click', ()=>{
    console.log(catRopa.id)
    contenedorCat.innerHTML='';
    if(catRopa.id == 'ropa'){
        mostrarProductos(stockProductos.filter(el => el.categoria == catRopa.id))
    }
    for (const boton of botonAgr){
        boton.addEventListener('click', ()=>{
            let producto = stockProductos.find(item => item.id == boton.id)
            console.log(`agregaste al carrito ${producto.nombre} ${producto.talle}`)
            carrito.push(producto)
            precioFinal += producto.precio
        })
    }
})

catAccesorios.addEventListener('click', ()=>{
    console.log(catAccesorios.id)
    contenedorCat.innerHTML='';
    if(catAccesorios.id == 'accesorios'){
        mostrarProductos(stockProductos.filter(el => el.categoria == catAccesorios.id))
    }
    for (const boton of botonAgr){
        boton.addEventListener('click', ()=>{
            let producto = stockProductos.find(item => item.id == boton.id)
            console.log(`agregaste al carrito ${producto.nombre}`)
            carrito.push(producto)
            precioFinal += producto.precio
        })
    }
})

btncarrito.addEventListener('click', ()=>{
    
    console.log(carrito)
    mostrarCarrito()
    console.log(`el precio total del carrito es de $${precioFinal}`)
})




/* mostrarProductos(); */


/* for (const boton of botonAgr){
    console.log(boton)
    boton.addEventListener('click', ()=>{
        console.log(boton.id);
        let producto = stockProductos.find(item => item.id == boton.id)
    })
} */

/* console.log(botonAgr) */


/* talles.addEventListener('change', ()=> {
    console.log(talles.value)
    if(talles.value =='all'){
        mostrarProductos(stockProductos)
        for (const boton of botonAgr){
            boton.addEventListener('click', ()=>{
                console.log(boton.id);
                let producto = stockProductos.find(item => item.id == boton.id)
            })
        }
    }else{
        mostrarProductos(stockProductos.filter(el => el.talle == talles.value))
        for (const boton of botonAgr){
            boton.addEventListener('click', ()=>{
                console.log(boton.id);
                let producto = stockProductos.find(item => item.id == boton.id)
            })
        }
    }
}) */

/* contenedor.innerHTML=''; */

















/* let cantidad = 0
let carrito = ""
let continuar = ""
let precioFinal = 0


function Agregado(){
    console.log("Agregaste " + carrito + " x " + cantidad + " a tu carrito.") 
}
function Cantidad(){
    cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
}

function mostrar(){
    for ( producto of BBDD){
        console.log(producto.nombre + " $" + producto.precio)
    }
}

function ordenarPrecio(){
    BBDD.sort((a,b)=>{
        return a.precio - b.precio
    })
}



class productos{
    constructor(nombre,precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

const producto1 = new productos ("Gorra", 500);
const producto2 = new productos ("Cadenita", 250);
const producto3 = new productos ("Stickers", 50);
const producto4 = new productos ("Remera", 1500);
const producto5 = new productos ("Buzo", 2500);
const producto6 = new productos ("Campera", 2000);

const BBDD = [
    producto1, producto2, producto3, producto4, producto5, producto6
] 


const mayorista = BBDD.map((el) => {
    return{
        nombre: el.nombre,
        precio: el.precio * 0.8
    }
})
function mostrarMayorista(){
    for ( producto of mayorista){
        console.log(producto.nombre + " $" + producto.precio)
    }
}


mostrar()

do{
    let inicio = prompt("¿elije una opcion 1.Ordenar 2.Comprar 3.Mayorista?").toLowerCase()
    switch(inicio){
        case "1":
            ordenarPrecio()
            console.clear()
            mostrar()
            break
        case "2":
            do{
                carrito = prompt("¿Que quieres agregar al carrito?").toLowerCase()
                    switch(carrito){
                        case "gorra":
                            Cantidad()
                            precioFinal += 500 * cantidad
                            Agregado()
                            break
                        case "cadenita":
                            Cantidad()
                            precioFinal += 250 * cantidad
                            Agregado()
                            break
                        case "stickers":
                            Cantidad()
                            precioFinal += 50 * cantidad
                            Agregado()
                            break
                        case "remera":
                            Cantidad()
                            precioFinal += 1500 * cantidad
                            Agregado()
                            break
                        case "buzo":
                            Cantidad()
                            precioFinal += 2500 * cantidad
                            Agregado()
                            break
                        case "campera":
                            Cantidad()
                            precioFinal += 2000 * cantidad
                            Agregado()
                            break
                        default:
                            alert("Ingresa un producto valido.")
                            break
                    }
                    continuar = prompt("¿Quiere agregar algo más? Si, no.").toLowerCase()
                } while (continuar == "si")
                    alert("El precio final es de: $" + precioFinal)
            break
        case"3":
            console.clear()
            mostrarMayorista()
            break
        default:
            alert("Ingresa una opción válida")
            break
    }
    continuar = prompt("¿Quieres hacer algo mas? Si, no.").toLowerCase()
} while (continuar == "si")
 */