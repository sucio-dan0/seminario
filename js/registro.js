document.getElementById("registroForm").addEventListener("submit", function(e){
    e.preventDefault();
    let nombre=document.getElementById("nombre").value.trim();
    let correo=document.getElementById("correo").value.trim();
    let password=document.getElementById("password").value;
    fetch("../php/registro.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:
        "nombre="+encodeURIComponent(nombre)+
        "&correo="+encodeURIComponent(correo)+
        "&password="+encodeURIComponent(password)
    })
    .then(response=>response.json())
    .then(function(data){
        if(data.estado=="ok"){
            alert(data.mensaje);
            window.location.href="inicio.html";
        }else{
            alert(data.mensaje);
        }
    })
    .catch(function(){
        alert("Error del servidor.");
    });
});