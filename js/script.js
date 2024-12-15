
/* VARIABLES */

let usuario
let contrasena
let intentosRestantes = 3
let eleccion = 0
let listaRestaurantes = []
let carritoLista = []
let listaNombresUsuarios = []
let listaContrasenasUsuarios = []
let contoladorStorage = false
let carritoStorage = []
let i = 0
let rutaImagenGato


/* CLASES */

class Menu {
  constructor(id, nombre, categoria, precio, img){
    this.id = id
    this.nombre = nombre
    this.categoria = categoria
    this.precio = precio
    this.img = img
  }
}

class Restaurante {
  constructor(id, nombre, menu, categoria, logo) {
    this.id = id
    this.nombre = nombre.toUpperCase()
    this.menu = menu
    this.categoria = categoria
    this.logo = logo

  }
}

class ItemCarrito {
  constructor(nombre, cantidad, precio) {
    this.nombre = nombre
    this.cantidad = cantidad
    this.precio = precio
  }
}

let menu1 = new Menu (1, "grande de muzzarella", "pizza", 20000, "../images/pizza.jpeg")
let menu2 = new Menu (2, "grande napolitana", "pizza", 22000, "../images/porcion-napolitana.webp")
let menu3 = new Menu (3, "fugazzetta rellena", "pizza", 26000, "../images/recipes.14329.jpeg")
let menu4 = new Menu (1, "whopper", "hamburguesa", 15000, "../images/Whopper-3.png")
let menu5 = new Menu (2, "whopper doble", "hamburguesa", 18000, "../images/BK_WEB_Whopper-Guacamole_1200X900_210922-1024x768.png")
let menu6 = new Menu (3, "whopper extreme", "hamburguesa", 20000, "../images/Whopper-Extreme.png")

const restaurante1 = new Restaurante(1, "Joe´s Pizza", [
  menu1,
  menu2,
  menu3],
  ["pizza"],
  "../images/LogoJoes.png"
)


const restaurante2 = new Restaurante(2, "Burger King", [
  menu4,
  menu5,
  menu6],
  ["hamburguesa"],
  "../images/burgerKing.png"
)

listaRestaurantes.push(restaurante1)
listaRestaurantes.push(restaurante2)

    /*  DOM  - Eventos - JSON */

    function crearTarjetaRestaurant (listaRestaurantes) {
    let btnVolver = document.getElementById("btnVolver")
    let contenedor = document.getElementById("contenedorProductos")
    let contenedorMenus = document.getElementById("contenedorMenus")
    

    contenedor.classList.toggle("oculta")
    btnVolver.classList.toggle("oculta")
    btnCarrito = document.getElementById("btnCarrito")
    
    
    btnCarrito.addEventListener("click", (e) => renderizarCarrito(e))

    contenedorMenus.classList.toggle("oculta")
    listaRestaurantes.forEach(restaurante => {
      let tarjetaRestaurante = document.createElement("div")
      tarjetaRestaurante.className = "restaurante"
      tarjetaRestaurante.innerHTML = `
      <h2> ${restaurante.nombre} </h2>
      <img class="logoRestaurante" id="${restaurante.id}" src="${restaurante.logo}" />
    `

    contenedor.appendChild(tarjetaRestaurante)

    let btnRestaurante = document.getElementById(restaurante.id)
    btnRestaurante.addEventListener("click", (e) => filtrarPorRestaurante(e, restaurante.id))
    })
    }

    function filtrarPorRestaurante(event, restaurante){
      let btnVolver = document.getElementById("btnVolver")
      let contenedor = document.getElementById("contenedorMenus")
      let btnCarrito = document.getElementById("btnCarrito")


      btnCarrito.classList.toggle("oculta")
      contenedor.classList.toggle("oculta")
      btnVolver.classList.toggle("oculta")
      btnVolver.addEventListener("click", recargarPagina)
      
    

      btnCarrito.addEventListener("click", actualizarCarrito)
      restaurante = listaRestaurantes[restaurante-1]
      let {id, menu, nombre, categoria} = restaurante
      let contenedorRestaurantes = document.getElementById("contenedorProductos")
      contenedorRestaurantes.classList.toggle("oculta")
      
      tituloRestaurante = document.createElement("div")
      tituloRestaurante.className="divTituloRestaurante"
      tituloRestaurante.innerHTML =`
        <h2 class="tituloRestaurante"> ${restaurante.nombre} </h2>
        
      `
      contenedor.appendChild(tituloRestaurante)
      
      menu.forEach(menu => {
      let tarjetaMenu = document.createElement("div")
      tarjetaMenu.className = "tarjetaMenu"
      tarjetaMenu.innerHTML = `
      
      <h2> ${menu.nombre.toUpperCase()} </h2>
      <img src="${menu.img}" />
      <h3> $ ${menu.precio} </h3>
      <button class="btnAgregarAlCarrito btn btn-outline-dark " id="${menu.id}"> Agregar al carrito! </button>
      `    
      
      contenedor.appendChild(tarjetaMenu)
      contenedor.classList.toggle("oculta")

    })
    let botonesAgregarProductos = document.getElementsByClassName("btnAgregarAlCarrito")
      for (const boton of botonesAgregarProductos) {
        boton.addEventListener("click", (e) => agregarAlCarrito(e, restaurante))
    }
    }

    function recargarPagina(){
      location.reload()
    }

    // CARRITO

    function agregarAlCarrito(e, restaurante){

      

      let btnAgregarAlCarrito = e.target.id
      let { menu } = restaurante
      let itemCarrito = menu[btnAgregarAlCarrito-1]
    
      let {nombre, precio, categoria} = itemCarrito
      

      carritoItemNombre = carritoLista.find((item)=> item.nombre==nombre )
      if (carritoItemNombre){
        mapCarritoNombre = carritoLista.map((item) => item.nombre)
        indexCarritoRepetido = mapCarritoNombre.indexOf(nombre)
        carritoLista[indexCarritoRepetido].cantidad++
      alertaToastify("agregado al carrito!")
      }else{
      itemCarrito = new ItemCarrito(nombre, 1,precio)
      carritoLista.push(itemCarrito)
      alertaToastify("AGREGADO AL CARRITO!")
    }
    guardarEnStorage("carrito", carritoLista)
    }
    
    function actualizarCarrito(){
      carritoStorage.forEach(item=>{
        carritoLista.push(item)
      })

      

      contenedorCarrito = document.getElementById("contenedorCarrito")
      eliminarItemsCarrito()
      let contenedorRestaurantes = document.getElementById("contenedorProductos") 
      contenedorRestaurantes.classList.toggle("oculta")

      let iterador = 0
      carritoLista.forEach(item =>{
        let tarjetaItemCarrito = document.createElement("div")
        tarjetaItemCarrito.className="tarjetaItemCarrito"
        tarjetaItemCarrito.innerHTML=`
        <h2> ${carritoLista[iterador].nombre.toUpperCase()} </h2>
        <h2> $ ${carritoLista[iterador].precio} </h2>
        <h2> Cantidad: ${carritoLista[iterador].cantidad} </h2>
        <button id="${carritoLista[iterador].nombre}" class="btnEliminarItemCarrito btn btn-outline-danger" > ELIMINAR </button>
        `
        iterador ++
        contenedorCarrito.appendChild(tarjetaItemCarrito)
      })
      let acumuladorPrecio = 0
      carritoLista.forEach(item=>{
        subtotalItem = item.precio * item.cantidad
        acumuladorPrecio = acumuladorPrecio + subtotalItem
      })
      
      let tarjetaTotalCarrito = document.createElement("div")
      tarjetaTotalCarrito.className="tarjetaTotalCarrito"
      tarjetaTotalCarrito.innerHTML=`
      <h2>Total: $ ${acumuladorPrecio}</h2>
      `  
      if(acumuladorPrecio>0){
      let botonPagar = document.createElement("button")
      botonPagar.id="btnPagar"
      botonPagar.className="btn btn-outline-success"
      botonPagar.innerHTML=`
      PAGAR
      `
      botonPagar.addEventListener("click", pagar)
      tarjetaTotalCarrito.appendChild(botonPagar)
      }
      contenedorCarrito.appendChild(tarjetaTotalCarrito)
    }

    function eliminarItemsCarrito(){
      carrito = document.getElementById("contenedorCarrito")
      while (carrito.firstChild){
        carrito.removeChild(carrito.firstChild)
      }
    }

    
    function pagar(){
      pedirImagendeGatito()
      setTimeout(()=> recargarPagina(), 6000)
      sessionStorage.removeItem("carrito")
    }
    
    function renderizarCarrito(){
      let contenedorRestaurantes = document.getElementById("contenedorProductos")
      let contenedorCarrito = document.getElementById("contenedorCarrito")
      let contenedorMenu = document.getElementById("contenedorMenus")
      let btnVolver = document.getElementById("btnVolver")
      let btnCarrito = document.getElementById("btnCarrito")
      
      contenedorCarrito.classList.toggle("oculta")
      btnCarrito.classList.toggle("oculta")
      btnVolver.addEventListener("click", recargarPagina)
      
      if(carritoLista.length>0){
        let btnEliminarItemCarrito = document.querySelectorAll(".btnEliminarItemCarrito")
      btnEliminarItemCarrito.forEach(btn=>{
        btn.addEventListener("click", (e) => eliminarItemCarrito(e))
      })
    }
    
    contenedorMenu.classList.toggle("oculta")
    contenedorRestaurantes.classList.toggle("oculta")
    btnVolver.classList.toggle("oculta")
    }
  
  function eliminarItemCarrito(e){
    nombreItemEliminar = e.target.id
    carritoListaNombreMap = carritoLista.map((item) => item.nombre)
    indexItemAEliminar = carritoListaNombreMap.indexOf(nombreItemEliminar)
    carritoLista.splice(indexItemAEliminar,1)
    sessionStorage.removeItem("carrito")
    guardarEnStorage("carrito", carritoLista)
    eliminarItemsCarrito()
    recargarPagina()
    }
  
    // STORAGE

    function guardarEnStorage(clave, valor) {
      let valorJson = JSON.stringify(valor)
      sessionStorage.setItem(clave, valorJson)
    }
    
    function recuperarCarritoDelStorage(){
      return JSON.parse(sessionStorage.getItem("carrito")) ?? []
    }
    
    // TOASTIFY
    
    function alertaToastify(mensaje){
      Toastify({
        text: mensaje,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right,rgb(177, 185, 178),rgb(36, 139, 53))",
      },
      onClick: function(){} // Callback after click
    }).showToast()
    }
  
    // SWEET ALERT
  
    function alertaSweet(texto, imagen){
    Swal.fire({
      text: texto,
      imageUrl: imagen,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    })
    }
  
  // THE CAT API

    function pedirImagendeGatito(){
    const apiKey = "live_seyRIDOzGXDxl40VyC9ldOjAOP5BwxwxO2XkZd6C795BOzOrtkq3HopMjx98qyHJ"
    const url = 'https://api.thecatapi.com/v1/images/search'

    fetch(url, {
      headers: {
        'x-api-ley': apiKey
      }
    })
    .then(response => response.json())
    .then(data => {
      const rutaImagenGato = data[0].url
      alertaSweet("Estamos procesando su pago", rutaImagenGato)
    })
    .catch(error => {
      console.error('Error al obtener la imagen:', error)
  })
    }

  /* EJECUCIÓN */
  
carritoStorage = recuperarCarritoDelStorage()
actualizarCarrito()
crearTarjetaRestaurant(listaRestaurantes)




