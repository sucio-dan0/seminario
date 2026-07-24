document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    let correo = document.getElementById("correo").value.trim();
    let password = document.getElementById("password").value;
    fetch("../php/login.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"correo="+encodeURIComponent(correo)+"&password="+encodeURIComponent(password)
    })
    .then(response=>response.json())
    .then(function(data){
        if(data.estado=="ok"){
            window.location.href=data.redireccion;
        }else{
            alert(data.mensaje);
        }
    })
    .catch(function(){

        alert("Error al conectar con el servidor.");
    });
});