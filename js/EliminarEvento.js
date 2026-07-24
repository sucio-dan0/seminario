fetch("../php/eliminarEvento.php")
.then(respuesta=>respuesta.json())
.then(eventos=>{
    const contenedor = document.getElementById("contenedorEventos");
    contenedor.innerHTML = "";
    eventos.forEach(evento=>{
        contenedor.innerHTML += `
        <div class="evento">
            <div class="info">
                <h2>${evento.nombre}</h2>
                <p><strong>Fecha:</strong> ${evento.fecha}</p>
                <p><strong>Hora:</strong> ${evento.hora}</p>
                <p><strong>Lugar:</strong> ${evento.lugar}</p>
                <p><strong>Boletos:</strong> ${evento.boletos}</p>
                <button
                    class="eliminar"
                    onclick="eliminar(${evento.idevento})">
                    ELIMINAR
                </button>
            </div>
            <img src="../img/${evento.imagen}" alt="Evento">
        </div>
        `;
    });
})
.catch(error=>{
    alert("Error al cargar los eventos.");
});
function eliminar(id){
    if(!confirm("¿Deseas eliminar este evento?")){
        return;
    }
    fetch("../php/eliminarEvento.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+id
    })
    .then(respuesta=>respuesta.text())
    .then(mensaje=>{
        alert(mensaje);
        location.reload();
    })
    .catch(()=>{
        alert("Error al eliminar el evento.");
    });
}