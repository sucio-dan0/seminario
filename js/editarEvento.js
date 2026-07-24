fetch("../php/editarEvento.php")
.then(respuesta=>respuesta.json())
.then(eventos=>{
    const contenedor=document.getElementById("contenedorEventos");
    contenedor.innerHTML="";
    eventos.forEach(evento=>{
        contenedor.innerHTML+=`
        <div class="evento">
            <img
                id="vista${evento.idevento}"
                src="../img/${evento.imagen}"
                alt="Evento"
                width="300">
            <br><br>
            <label>Cambiar imagen:</label>
            <input
                type="file"
                id="imagen${evento.idevento}"
                accept="image/*"
                onchange="previsualizar(this,${evento.idevento})">
            <br><br>
            <input
                type="text"
                id="nombre${evento.idevento}"
                value="${evento.nombre}">
            <br>
            <input
                type="date"
                id="fecha${evento.idevento}"
                value="${evento.fecha}">
            <br>
            <input
                type="time"
                id="hora${evento.idevento}"
                value="${evento.hora}">
            <br>
            <input
                type="text"
                id="lugar${evento.idevento}"
                value="${evento.lugar}">
            <br>
            <textarea
                id="descripcion${evento.idevento}">${evento.descripcion}</textarea>
            <br>
            <input
                type="number"
                id="boletos${evento.idevento}"
                value="${evento.boletos}">
            <br><br>
            <button
                class="guardar"
                onclick="guardar(${evento.idevento})">
                GUARDAR CAMBIOS
            </button>
            <hr>
        </div>
        `;
    });
})
.catch(error=>{
    console.error(error);
    alert("Error al cargar los eventos.");
});
function previsualizar(input,id){
    if(input.files && input.files[0]){
        const lector=new FileReader();
        lector.onload=function(e){
            document.getElementById("vista"+id).src=e.target.result;
        }
        lector.readAsDataURL(input.files[0]);
    }
}
function guardar(id){
    const datos=new FormData();
    datos.append("id",id);
    datos.append("nombre",document.getElementById("nombre"+id).value);
    datos.append("fecha",document.getElementById("fecha"+id).value);
    datos.append("hora",document.getElementById("hora"+id).value);
    datos.append("lugar",document.getElementById("lugar"+id).value);
    datos.append("descripcion",document.getElementById("descripcion"+id).value);
    datos.append("boletos",document.getElementById("boletos"+id).value);
    const archivo=document.getElementById("imagen"+id).files[0];
    if(archivo){
        datos.append("imagen",archivo);
    }
    fetch("../php/editarEvento.php",{
        method:"POST",
        body:datos
    })
    .then(respuesta=>respuesta.text())
    .then(mensaje=>{
        alert(mensaje);
        location.reload();
    })
    .catch(error=>{
        console.error(error);
        alert("Error al guardar.");
    });
}