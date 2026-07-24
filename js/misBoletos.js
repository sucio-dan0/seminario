document.addEventListener("DOMContentLoaded",()=>{


fetch("../php/misBoletos.php")


.then(res=>res.json())


.then(data=>{


let contenedor=document.getElementById("listaBoletos");


if(data.error){

contenedor.innerHTML=data.error;

return;

}


if(data.length===0){

contenedor.innerHTML="No tienes boletos comprados";

return;

}



data.forEach(boleto=>{


contenedor.innerHTML+=`

<div class="boleto">

<img src="../img/${boleto.imagen}">


<h2>${boleto.nombre}</h2>

<p>
<strong>Lugar:</strong> ${boleto.lugar}
</p>

<p>
<strong>Fecha:</strong> ${boleto.fecha}
</p>

<p>
<strong>Hora:</strong> ${boleto.hora}
</p>

<p>
<strong>Cantidad:</strong> ${boleto.cantidad}
</p>

<p>
<strong>Código:</strong> ${boleto.codigo}
</p>


</div>

`;

});


})


.catch(()=>{

document.getElementById("listaBoletos").innerHTML="Error al cargar boletos";

});


});