document.addEventListener("DOMContentLoaded",()=>{

let url=new URLSearchParams(window.location.search);

let id=url.get("id");

let cantidad=url.get("cantidad");


if(!id){

id=localStorage.getItem("idEvento");

}


if(!cantidad){

cantidad=localStorage.getItem("cantidadBoletos");

}


if(!id){

alert("No se encontró el evento");

return;

}


if(!cantidad){

cantidad=1;

}


document.getElementById("cantidadBoletos").textContent=cantidad;

document.getElementById("totalPagar").textContent="$"+(cantidad*500)+" MXN";


fetch("../php/obtenerEvento.php?id="+id)

.then(res=>res.json())

.then(data=>{


if(data.error){

alert(data.error);

return;

}


document.getElementById("nombreEvento").textContent=data.nombre;


})


.catch(()=>{

alert("Error al buscar evento");

});



document.getElementById("formPago").addEventListener("submit",(e)=>{

e.preventDefault();


let datos=new URLSearchParams();

datos.append("id",id);

datos.append("cantidad",cantidad);


fetch("../php/comprarBoletos.php",{

method:"POST",

headers:{

"Content-Type":"application/x-www-form-urlencoded"

},

body:datos

})


.then(res=>res.json())

.then(data=>{


if(data.error){

alert(data.error);

return;

}


alert("Compra realizada correctamente");

window.location.href="boleto.html?id="+id;


});


});


});