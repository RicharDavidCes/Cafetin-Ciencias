// 1. LAS LISTAS DE DATOS
// Aquí guardamos los productos que se venden y las reseñas de la gente.
let menuAdmin = [
    { id: 1, nombre: "Empanada de Queso", precio: 2.50, tipo: "Producto" },
    { id: 2, nombre: "Café con Leche", precio: 1.50, tipo: "Producto" },
    { id: 3, nombre: "Sandwich Club", precio: 4.00, tipo: "Producto" }
];

let resenasAdmin = [
    { id: 101, nombre: "Pedro.Perez123", info: "¡Las mejores empanadas de la facultad!", tipo: "Reseña" },
    { id: 102, nombre: "MariaCiencias", info: "El café estaba un poco frío hoy.", tipo: "Reseña" }
];

// 2. ESTADO DE LA VISTA
// Esta variable nos dice si estamos viendo la sección de 'Productos' o la de 'Reseñas'.
let vistaActual = 'Producto';

/*
    3. DIBUJAR LA TABLA (renderizarGestion)
    Esta función limpia la tabla de la pantalla y la vuelve a llenar 
    dependiendo de lo que el administrador quiera ver en ese momento.
    - Si estamos en 'Producto', muestra nombres y precios.
    - Si estamos en 'Reseña', muestra el usuario y su comentario.
 */
function renderizarGestion() {
    const cuerpoTabla = document.getElementById('cuerpo_items_admin');
    cuerpoTabla.innerHTML = '';

    const datosAMostrar = (vistaActual === 'Producto') ? menuAdmin : resenasAdmin;

    datosAMostrar.forEach((item, indice) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${item.nombre}</strong></td>
            <td><span class="distintivo ${item.tipo.toLowerCase()}">${item.tipo}</span></td>
            <td>${item.tipo === 'Producto' ? '$' + item.precio.toFixed(2) : item.info}</td>
            <td>
                <button class="boton_eliminar_admin" onclick="eliminarItem(${indice})">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

/*
    4. CAMBIAR ENTRE SECCIONES (cambiarVistaAdmin)
    Cuando el admin hace clic en las pestañas de arriba esta función 
    cambia la 'vistaActual' y marca cuál botón está activo visualmente.
*/
function cambiarVistaAdmin(tipo) {
    vistaActual = tipo;
    
    document.querySelectorAll('.boton_pestana').forEach(boton => boton.classList.remove('activa'));
    if(tipo === 'Producto') {
        document.getElementById('pestana_productos').classList.add('activa');
    } else {
        document.getElementById('pestana_resenas').classList.add('activa');
    }

    renderizarGestion();
}

/*
    5. BORRAR CONTENIDO (eliminarItem)
    Si un producto ya no se vende o una reseña es inadecuada, el admin puede borrarlo.
    Primero lanza un aviso de confirmación.
*/
function eliminarItem(indice) {
    if(confirm(`¿Seguro que deseas eliminar esta ${vistaActual}?`)) {
        if(vistaActual === 'Producto') {
            menuAdmin.splice(indice, 1);
        } else {
            resenasAdmin.splice(indice, 1);
        }
        renderizarGestion();
    }
}

/*
    6. AÑADIR NUEVOS PRODUCTOS
    Cuando el administrador llena el formulario y le da a "Guardar":
    - Crea un producto nuevo con un ID único basado en la hora actual (Date.now).
    - Lo mete en la lista y limpia el formulario automáticamente.
*/
document.getElementById('formulario_producto').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('admin_nombre').value;
    const precio = parseFloat(document.getElementById('admin_precio').value);
    
    menuAdmin.push({ id: Date.now(), nombre: nombre, precio: precio, tipo: "Producto" });
    
    this.reset();
    cambiarVistaAdmin('Producto'); // asegura que este viendo la lista de productos.
    alert("Producto agregado correctamente.");
});

// 7. ARRANQUE INICIAL
// Apenas carga la página, dibuja la tabla con los datos que tengamos.
window.onload = renderizarGestion;