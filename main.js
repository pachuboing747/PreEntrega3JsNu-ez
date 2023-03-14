const baseDeDatos = [
    {
        id: 1,
        nombre: "Camiseta Boca Juniors Titular",
        precio: 34999,
    },
    {
        id: 2,
        nombre: "Camiseta Boca Juniors Suplente ",
        precio: 34999,
    },
    {
        id: 3,
        nombre: "Shorts Boca Juniors Titular",
        precio: 15999,
    },
    {
        id: 4,
        nombre: "Shorts Boca Juniors suplente",
        precio: 11999,

    },


];


let carrito = [];
const divisa = "$";
const Items = document.querySelector('#items');
const Carrito = document.querySelector('#carrito');
const Total = document.querySelector('#total');
const BotonVaciar = document.querySelector('#boton-vaciar');

function productos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card');
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
     
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add("btn");
        miNodoBoton.textContent = "+";
        miNodoBoton.setAttribute("marcador", info.id);
        miNodoBoton.addEventListener("click", agregarProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        Items.appendChild(miNodo);
    });
}

function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute("marcador"))
    crearCarrito();

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
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        
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
    crearCarrito() 
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
}

BotonVaciar.addEventListener('click', vaciarCarrito);

productos();
crearCarrito() ;

