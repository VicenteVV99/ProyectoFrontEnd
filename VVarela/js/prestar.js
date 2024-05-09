document.addEventListener("DOMContentLoaded", function () {
    const autorSelect = document.getElementById("inputAutor");
    const libroSelect = document.getElementById("inputLibro");

    function cargarAutores() {
        fetch("data/autores.json")
            .then(response => response.json())
            .then(data => {
                data.autores.forEach(autor => {
                    const option = document.createElement("option");
                    option.textContent = autor.nombre;
                    autorSelect.appendChild(option);
                });

                autorSelect.addEventListener("change", function () {
                    const autorSeleccionado = this.value;
                    const librosAutor = data.autores.find(autor => autor.nombre === autorSeleccionado).libros;

                    libroSelect.innerHTML = "<option selected>Seleccione un libro</option>";
                    librosAutor.forEach(libro => {
                        const option = document.createElement("option");
                        option.textContent = libro.titulo;
                        libroSelect.appendChild(option);
                    });
                });
            })
            .catch(error => {
                console.error("Error al cargar el JSON de autores:", error);
            });
    }

    function validarRut(Rut) {
        const patron = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
        return patron.test(Rut);
    }

    function mostrarMensajeError(mensaje) {
        const errorElement = document.getElementById('alerta1');
        if (errorElement) {
            errorElement.remove();
        }
        inputRut.parentElement.insertAdjacentHTML("beforeend", `<div id="alerta1" class="alert alert-danger" role="alert">${mensaje}</div>`);
    }

    const inputRut = document.getElementById("Rut");
    inputRut.addEventListener("blur", function () {
        const Rut = this.value.trim();
        if (Rut.length === 0) { 
            mostrarMensajeError("El campo no puede quedar vacío");
        } else if (Rut.split('-').length !== 2) { 
            mostrarMensajeError("Formato de RUT incorrecto");
        } else if (!validarRut(Rut)) { 
            mostrarMensajeError("RUT inválido");
        }
    });

    // Llamar a la función para cargar los autores al cargar el DOM
    cargarAutores();
});
