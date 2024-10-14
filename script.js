document.addEventListener('DOMContentLoaded', function () {
    const crearPublicacionBtn = document.getElementById('crearPublicacionBtn');
    const modalCrearPublicacion = document.getElementById('modalCrearPublicacion');
    const cerrarModal = document.getElementById('cerrarModal');
    const formPublicacion = document.getElementById('formPublicacion');
    const contenedorPublicacion = document.querySelector('.contenedor-publicacion');
    const modalDetallePublicacion = document.getElementById('modalDetallePublicacion');
    const cerrarModalDetalle = document.getElementById('cerrarModalDetalle');
    const detalleTitulo = document.getElementById('detalleTitulo');
    const detalleFecha = document.getElementById('detalleFecha');
    const detalleDescripcion = document.getElementById('detalleDescripcion');
    
    // Mostrar modal de inicio de sesión
    const modalSignIn = document.getElementById('modalSignIn');
    modalSignIn.style.display = 'flex';

    // Manejo del inicio de sesión
    const formSignIn = document.getElementById('formSignIn');
    formSignIn.addEventListener('submit', function (event) {
        event.preventDefault();
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        if (usuario === "Admin" && password === "1234") {
            modalSignIn.style.display = 'none'; // Cerrar Modal de Entrada
            crearPublicacionBtn.style.display = 'inline'; // Mostrar el botón de crear publicación
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    });

    // Manejo del modal para crear publicación
    crearPublicacionBtn.addEventListener('click', function () {
        modalCrearPublicacion.style.display = 'flex';
    });

    cerrarModal.addEventListener('click', function () {
        modalCrearPublicacion.classList.add('fadeOut');
        setTimeout(() => {
            modalCrearPublicacion.style.display = 'none';
            modalCrearPublicacion.classList.remove('fadeOut');
        }, 500);
    });

    formPublicacion.addEventListener('submit', function (event) {
        event.preventDefault();

        const categoriaPublicacion = document.getElementById('categoriaPublicacion').value;
        const tituloPublicacion = document.getElementById('tituloPublicacion').value;
        const descripcionPublicacion = document.getElementById('descripcionPublicacion').value;

        if (categoriaPublicacion.trim() === '' || tituloPublicacion.trim() === '' || descripcionPublicacion.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.toLocaleString('default', { month: 'short' });
        const año = fechaActual.getFullYear();
        const fechaFormateada = dia + ' ' + mes + ' ' + año;

        const nuevaPublicacion = document.createElement('div');
        nuevaPublicacion.className = 'caja-publicacion';
        nuevaPublicacion.innerHTML = `
            <h1 class="titulo-publicacion" data-titulo="${tituloPublicacion}" data-fecha="${fechaFormateada}" data-descripcion="${descripcionPublicacion}">
            ${tituloPublicacion}</h1><br>
            <h2 class="categoria">${categoriaPublicacion}</h2><br>
            <span class="fecha-publicacion">${fechaFormateada}</span>
            <p class="descripcion-publicacion">${descripcionPublicacion.substring(0, 100)}...</p>
            <button class="eliminar-publicacion" data-titulo="${tituloPublicacion}">Eliminar</button>
            <span class="cargar-mas" data-titulo="${tituloPublicacion}" data-fecha="${fechaFormateada}" data-descripcion="${descripcionPublicacion}">Cargar más</span>
        `;

        contenedorPublicacion.insertBefore(nuevaPublicacion, contenedorPublicacion.firstChild);

        const mensajePublicacionCreada = document.getElementById('mensajePublicacionCreada');
        mensajePublicacionCreada.style.display = 'block';

        modalCrearPublicacion.style.display = 'none';
        formPublicacion.reset();

        setTimeout(() => {
            mensajePublicacionCreada.style.display = 'none';
        }, 3000);
    });

    contenedorPublicacion.addEventListener('click', function (event) {
        if (event.target.classList.contains('cargar-mas') || event.target.classList.contains('titulo-publicacion')) {
            const titulo = event.target.getAttribute('data-titulo');
            const fecha = event.target.getAttribute('data-fecha');
            const descripcion = event.target.getAttribute('data-descripcion');

            detalleTitulo.textContent = titulo;
            detalleFecha.textContent = fecha;
            detalleDescripcion.textContent = descripcion;

            modalDetallePublicacion.style.display = 'flex';
        }

        if (event.target.classList.contains('eliminar-publicacion')) {
            const tituloAEliminar = event.target.getAttribute('data-titulo');
            const publicacionAEliminar = document.querySelector(`.titulo-publicacion[data-titulo="${tituloAEliminar}"]`).closest('.caja-publicacion');

            publicacionAEliminar.classList.add('fadeOut');

            setTimeout(() => {
                contenedorPublicacion.removeChild(publicacionAEliminar);
            }, 500);
        }
    });

    cerrarModalDetalle.addEventListener('click', function () {
        modalDetallePublicacion.classList.add('fadeOut');
        setTimeout(() => {
            modalDetallePublicacion.style.display = 'none';
            modalDetallePublicacion.classList.remove('fadeOut');
        }, 500);
    });
});

