document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');

    const campos = ['nombre', 'apellido', 'rut', 'email', 'password', 'confirmPassword'];
    campos.forEach(campo => {
        const input = document.getElementById(campo);
        input.addEventListener('blur', function() {
            validarCampo(campo);
        });
    });

    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let formularioValido = true;
        campos.forEach(campo => {
            if (!validarCampo(campo, true)) {
                formularioValido = false;
            }
        });

        if (formularioValido) {
            alert('Registro exitoso');
            registroForm.reset();
        }
        
        return false; 
    });

    function validarCampo(campo, submit = false) {
        const input = document.getElementById(campo);
        const errorSpan = document.getElementById('error' + campo.charAt(0).toUpperCase() + campo.slice(1));

        if (!input.checkValidity()) {
            if (submit || input.value.trim() !== '') {
                input.classList.add('is-invalid');
                errorSpan.textContent = input.validationMessage;
                return false;
            }
        } else {
            input.classList.remove('is-invalid');
            errorSpan.textContent = '';

            if (campo === 'password') {
                if (!validarPassword(input.value.trim())) {
                    input.classList.add('is-invalid');
                    errorSpan.textContent = 'La contraseña no cumple con los requisitos.';
                    return false;
                }
            }

            if (campo === 'rut') {
                if (!validaRut(input.value.trim())) {
                    input.classList.add('is-invalid');
                    errorSpan.textContent = 'El Rut ingresado no es válido.';
                    return false;
                }
            }

            if (campo === 'email') {
                if (!validarEmail(input.value.trim())) {
                    input.classList.add('is-invalid');
                    errorSpan.textContent = 'El correo electrónico no cumple con los requisitos.';
                    return false;
                }
            }
        }

        return true;
    }

    function validarPassword(password) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&\/\(\)=\?\¡\¿\*\-\+\,\.;\:_\[\]\{\}]).{4,16}$/;
        return regex.test(password);
    }

    function validaRut(rut) {
        rut = rut.replace(/\./g, '').replace(/\-/g, '').toUpperCase();

        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);

        let suma = 0;
        for (let i = cuerpo.length - 1, j = 2; i >= 0; i--, j++) {
            suma += parseInt(cuerpo[i]) * j;
            if (j === 7) j = 1;
        }
        let resto = suma % 11;
        let dvEsperado = resto === 0 ? '0' : resto === 1 ? 'K' : 11 - resto;

        return dv === dvEsperado.toString();
    }

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})$/;
        return regex.test(email);
    }
});

