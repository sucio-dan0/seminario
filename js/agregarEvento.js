document.getElementById("eventoForm").addEventListener("submit",function(e){
    e.preventDefault();
    let datos = new FormData();
    datos.append("nombre", document.getElementById("nombre").value);
    datos.append("fecha", document.getElementById("fecha").value);
    datos.append("hora", document.getElementById("hora").value);
    datos.append("lugar", document.getElementById("lugar").value);
    datos.append("descripcion", document.getElementById("descripcion").value);
    datos.append("imagen", document.getElementById("imagen").files[0]);
    datos.append("boletos", document.getElementById("boletos").value);
    fetch("../php/agregarEvento.php",{
        method:"POST",
        body:datos
    })
    .then(r=>r.json())
    .then(function(data){
        alert(data.mensaje);
        if(data.estado=="ok"){
            window.location="admin.html";
        }
    });
});