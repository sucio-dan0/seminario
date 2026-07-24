document.addEventListener("DOMContentLoaded",()=>{

function mostrarError(mensaje){

document.body.innerHTML+=`
<div style="
position:fixed;
top:20px;
left:50%;
transform:translateX(-50%);
background:#c62828;
color:white;
padding:20px;
border-radius:10px;
font-size:20px;
z-index:9999;">
ERROR: ${mensaje}
</div>`;

}

let id=new URLSearchParams(window.location.search).get("id");

if(!id){

mostrarError("No se recibió el ID del evento");

return;

}

fetch("../php/obtenerEvento.php?id="+id)

.then(res=>{

if(!res.ok){

throw new Error("El archivo PHP no responde. Código: "+res.status);

}

return res.json();

})

.then(data=>{

if(data.error){

mostrarError(data.error);

return;

}

document.getElementById("nombreEvento").innerHTML=data.nombre;
document.getElementById("descripcionEvento").innerHTML=data.descripcion;
document.getElementById("lugarEvento").innerHTML=data.lugar;
document.getElementById("fechaEvento").innerHTML=data.fecha;
document.getElementById("horaEvento").innerHTML=data.hora;
document.getElementById("boletosEvento").innerHTML=data.boletos;
document.getElementById("imagenEvento").src="../img/"+data.imagen;

})

.catch(error=>{

mostrarError(error.message);

});



const formulario=document.getElementById("formComprar");

if(formulario){

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

let cantidad=document.getElementById("cantidadBoletos").value;

window.location.href="pago.html?id="+id+"&cantidad="+cantidad;

});

}


});