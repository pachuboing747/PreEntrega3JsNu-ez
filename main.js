const baseDeDatos = [
    {
        id: 1,
        nombre: "Camiseta Boca Juniors Titular",
        precio: 34999,
        imagen: './assets/camiseta_titular.jpg'
    },
    {
        id: 2,
        nombre: "Camiseta Boca Juniors Suplente ",
        precio: 34999,
        imagen: './assets/camiseta_alternativa.jpg'
      
    },
    {
        id: 3,
        nombre: "Shorts Boca Juniors Titular",
        precio: 15999,
        imagen: './assets/short_titular.jpg'
        
    },
    {
        id: 4,
        nombre: "Shorts Boca Juniors suplente",
        precio: 11999,
        imagen: './assets/short_alternativo.jpg'
    

    },


];

let carrito = [];
const divisa = "$";
let Items = document.querySelector("#items");
let Carrito = document.querySelector("#carrito");
let Total = document.querySelector("#total");
let BotonVaciar = document.querySelector("#boton-vaciar");
let LocalStorage = window.localStorage;

crearCarrito()

function productos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card');
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('imagen');
        miNodoImagen.setAttribute('src', info.imagen);
        miNodoImagen.setAttribute("marcador", info.id);
        miNodoImagen.addEventListener("click", agregarProductoAlCarrito);
        
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
     
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add("btn");
        miNodoBoton.textContent = "+";
        miNodoBoton.setAttribute("marcador", info.id);
        miNodoBoton.addEventListener("click", agregarProductoAlCarrito);
       
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        Items.appendChild(miNodo);
       

    });
 
}


function agregarProductoAlCarrito(evento) {
    
    carrito.push(evento.target.getAttribute("marcador"));
    crearCarrito();
    guardarLocalStorage()
}



function crearCarrito() {
    Carrito.textContent = "";

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
    
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
        
            return itemBaseDatos.id === parseInt(item);
        });
    
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total += 1 : total;
        }, 0);
    
        const miNodo = document.createElement('li');
        miNodo.classList.add("list-group-item");
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;
        
        const miBoton = document.createElement('button');
        miBoton.classList.add("btn");
        miBoton.textContent = "X";
        miBoton.style.marginLeft = "1rem";
        miBoton.dataset.item = item;
        miBoton.addEventListener("click", borrarItemCarrito);

        miNodo.appendChild(miBoton);
        Carrito.appendChild(miNodo);

    });
  
    Total.textContent = calcularTotal();

}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    crearCarrito();
    guardarLocalStorage();
}

function calcularTotal() { 
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    crearCarrito() ;
    localStorage.clear();
}

function guardarLocalStorage () {
    LocalStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarLocalStorage () {
    if (LocalStorage.getItem("carrito") !== null) {
        carrito = JSON.parse(LocalStorage.getItem("carrito"));
    }
}


BotonVaciar.addEventListener('click', vaciarCarrito);

cargarLocalStorage();
productos();
crearCarrito() ;
