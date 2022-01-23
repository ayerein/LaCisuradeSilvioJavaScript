
let categoria = ""
let cantidad = 0
let carrito = ""
let continuar = ""
let precioFinal = 0

function Agregado(){
    console.log("Agregaste " + carrito + " x " + cantidad + " a tu carrito.") 
}

do{
    categoria = prompt("¿En que categoria de productos te gustaria buscar? Accesorios, discos, ropa.").toLowerCase()
    switch(categoria){
        case "accesorios":
            carrito = prompt("¿Que quieres agregar al carrito? Gorra, cadenita, sticker.").toLowerCase()
                switch(carrito){
                    case "gorra":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 500 * cantidad
                        Agregado()
                        break
                    case "cadenita":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 250 * cantidad
                        Agregado()
                        break
                    case "sticker":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 50 * cantidad
                        Agregado()
                        break
                    default:
                        alert("Ingresa un producto valido.")
                }
            break; 
            
        case "ropa":
            carrito = prompt("¿Que quieres agregar al carrito? Remera, buzo, campera.").toLowerCase()
                switch(carrito){
                    case "remera":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 1500 * cantidad
                        Agregado()
                        break
                    case "buzo":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 2500 * cantidad
                        Agregado()
                        break
                    case "campera":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 2000 * cantidad
                        Agregado()
                        break
                    default:
                        alert("Ingresa un producto valido.")
                }
            break; 

        case "discos":
            carrito = prompt("¿Que disco quieres agregar al carrito? Primero, segundo.").toLowerCase()
                switch(carrito){
                    case "primero":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 1000 * cantidad
                        Agregado()
                        break
                    case "segundo":
                        cantidad = Number(prompt("¿Que cantidad te gustaria agregar?"))
                        precioFinal += 1250 * cantidad
                        Agregado()
                        break
                    default:
                        alert("Ingresa un producto valido.")
                }
            break; 
        default:
            alert("Ingresa un producto valido.")
    }
    continuar = prompt("¿Quiere agregar algo más? Si, no.").toLowerCase()
} while (continuar == "si")
console.log("El precio final es de: $" + precioFinal)
