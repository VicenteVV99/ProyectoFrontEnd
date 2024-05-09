document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const user = document.getElementById('user').value.trim();
        const password = document.getElementById('contrasenia').value.trim();

        if (validarCredenciales(user, password)) {
            window.location.href = 'landing_page.html';
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.classList.remove('d-none');
        }
    });

    function validarCredenciales(user, password) {
        return (user === 'vvarela@inacapmail.cl' && password === 'VvV04/02-99');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');

    // Agregar eventos blur para validar campos
    const campos = ['nombre', 'apellido', 'rut', 'email', 'password', 'confirmPassword'];
    campos.forEach(campo => {
        const input = document.getElementById(campo);
        input.addEventListener('blur', function() {
            validarCampo(campo);
        });
    });

    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        campos.forEach(campo => validarCampo(campo, true));
    });

    function validarCampo(campo, submit = false) {
        const input = document.getElementById(campo);
        const errorSpan = document.getElementById('error' + campo.charAt(0).toUpperCase() + campo.slice(1));

        if (!input.checkValidity()) {
            if (submit || input.value.trim() !== '') {
                input.classList.add('is-invalid');
                errorSpan.textContent = input.validationMessage;
            }
        } else {
            input.classList.remove('is-invalid');
            errorSpan.textContent = '';
        }
    }
});


