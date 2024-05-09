document.getElementById('calcularDeuda').addEventListener('click', function () {
    // Obtener la fecha de devolución ingresada por el usuario
    const fechaDevolucion = new Date(document.getElementById('fechaDevolucion').value);
    // Obtener la fecha actual
    const fechaActual = new Date();
  
    // Calcular la diferencia de días entre la fecha de devolución y la fecha actual
    const diffTime = Math.abs(fechaDevolucion - fechaActual);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    // Calcular la deuda acumulada
    let deuda = 0;
    if (fechaActual > fechaDevolucion) {
      deuda = diffDays * 100;
    }
  
    // Mostrar el resultado en el elemento con id "resultado"
    document.getElementById('resultado').innerHTML = `La deuda acumulada es de $${deuda}`;
  });
  