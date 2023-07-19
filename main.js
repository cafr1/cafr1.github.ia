const productos = [
{
    id: "playera deportes",
    titulo:"playera deportes",
    imagen: "imagenes/deporte (2).png",
    categoria: {
        nombre: "deportes",
        id: "deportes"
    },
    precio: 1000
},

{
    id: "playera gym",
    titulo:"playera gym",
    imagen: "imagenes/gym.png",
    categoria: {
        nombre: "gym",
        id: "gym"
    },
    precio: 1001
},

{
    id: "playera anime",
    titulo:"playera anime",
    imagen: "imagenes/anime.jpg",
    categoria: {
        nombre: "anime",
        id: "anime"
    },
    precio: 1002
},

{
    id: "playera mascotas",
    titulo:"playera mascotas",
    imagen: "imagenes/mascotas.png",
    categoria: {
        nombre: "mascotas",
        id: "mascotas"
    },
    precio: 1004
},


{
    id: "playera geek",
    titulo:"playera geek",
    imagen: "imagenes/geek.JPG",
    categoria: {
        nombre: "geek",
        id: "geek"
    },
    precio: 1005
},

{
    id: "playera otros",
    titulo:"playera otros",
    imagen: "imagenes/otros.png",
    categoria: {
        nombre: "otros",
        id: "otros"
    },
    precio: 1006
},

{
    id: "playera top",
    titulo:"playera top",
    imagen: "imagenes/lo mas top.jpg",
    categoria: {
        nombre: "lo mas top",
        id: "lo mas top"
    },
    precio: 1007
},

{
    id: "todos los productos",
    titulo:"todos los productos",
    imagen: "imagenes/lo mas top.jpg",
    categoria: {
        nombre: "todos los productos",
        id: "todos los productos"
    },
    precio: 1000
}
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach( producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =  `

        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">${producto.precio}</p>
                        <button class="producto-agregar" id= "${producto.id}">Agregar</button>
                    </div>    
                    `;        
       contenedorProductos.append(div);    
})
    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach (boton => boton.classList.remove("active"));
                e.currentTarget.classList.add("active");


                if (e.currentTarget.id != "todos los productos"){
                    const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                    tituloPrincipal.innerText = productoCategoria.categoria.nombre;
                    const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

                    cargarProductos(productosBoton);
                }

                else{
                    tituloPrincipal.innerText = "Todos los productos";
                    cargarProductos(productos);
                }
               
        }
)

})

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    }
        
    );
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();

} else {
    productosEnCarrito = [];
}



function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
        

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
}
actualizarNumerito();
localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }

    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
        
    }
    