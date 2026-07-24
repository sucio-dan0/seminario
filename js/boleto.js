document.addEventListener("DOMContentLoaded",()=>{

fetch("../php/obtenerBoleto.php")

.then(res=>res.json())

.then(data=>{


if(data.error){

alert(data.error);

return;

}


document.getElementById("imagenEvento").src="../img/"+data.imagen;

document.getElementById("nombreEvento").textContent=data.nombre;

document.getElementById("lugarEvento").textContent=data.lugar;

document.getElementById("fechaEvento").textContent=data.fecha;

document.getElementById("horaEvento").textContent=data.hora;

document.getElementById("cantidadBoletos").textContent=data.cantidad+" boleto(s)";

document.getElementById("codigoBoleto").textContent=data.codigo;


})


.catch(()=>{

alert("Error al cargar el boleto");

});


});