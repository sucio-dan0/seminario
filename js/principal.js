document.addEventListener("DOMContentLoaded",()=>{
const contenedor=document.getElementById("contenedorEventos");
const buscador=document.getElementById("buscador");
let eventos=[];
fetch("../php/principal.php")
.then(respuesta=>respuesta.json())
.then(datos=>{
eventos=datos;
mostrarEventos(eventos);
})
.catch(error=>{
contenedor.innerHTML="<h2>Error al cargar eventos</h2>";
console.log(error);
});
function mostrarEventos(lista){
contenedor.innerHTML="";
if(lista.length===0){
contenedor.innerHTML="<h2>No se encontraron eventos</h2>";
return;
}
lista.forEach(evento=>{
contenedor.innerHTML+=`
<div class="evento">
<div class="info">
<h2>${evento.nombre}</h2>
<p>🕗 ${evento.hora}</p>
<p>📅 ${evento.fecha}</p>
<p>📍 ${evento.lugar}</p>
<form action="evento.html" method="get">
<input
type="hidden"
name="id"
value="${evento.idevento}">
<button type="submit">
VER
</button>
</form>
</div>
<img src="../img/${evento.imagen}" alt="Evento">
</div>
<br>
`;
});
}
buscador.addEventListener("input",()=>{
let texto=buscador.value.toLowerCase();
let filtrados=eventos.filter(evento=>{
return evento.nombre.toLowerCase().includes(texto) ||
evento.lugar.toLowerCase().includes(texto) ||
evento.fecha.toLowerCase().includes(texto);
});
mostrarEventos(filtrados);
});
});