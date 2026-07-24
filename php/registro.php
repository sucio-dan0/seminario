<?php

require_once "conexion.php";

header("Content-Type: application/json");

if($_SERVER["REQUEST_METHOD"]!="POST"){

    exit;

}

$nombre=trim($_POST["nombre"] ?? "");
$correo=trim($_POST["correo"] ?? "");
$password=$_POST["password"] ?? "";

if(empty($nombre) || empty($correo) || empty($password)){

    echo json_encode([
        "estado"=>"error",
        "mensaje"=>"Complete todos los campos."
    ]);

    exit;

}

if(!filter_var($correo,FILTER_VALIDATE_EMAIL)){

    echo json_encode([
        "estado"=>"error",
        "mensaje"=>"Correo no válido."
    ]);

    exit;

}

$sql="SELECT idusuarioPrimaria FROM usuarios WHERE correo=?";

$stmt=$conexion->prepare($sql);

$stmt->bind_param("s",$correo);

$stmt->execute();

$stmt->store_result();

if($stmt->num_rows>0){

    echo json_encode([
        "estado"=>"error",
        "mensaje"=>"Ese correo ya está registrado."
    ]);

    exit;

}

$stmt->close();

$hash=password_hash($password,PASSWORD_DEFAULT);

$rol="usuario";

$sql="INSERT INTO usuarios(nombre,correo,contraseña,rol)
VALUES(?,?,?,?)";

$stmt=$conexion->prepare($sql);

$stmt->bind_param("ssss",$nombre,$correo,$hash,$rol);

if($stmt->execute()){

    echo json_encode([
        "estado"=>"ok",
        "mensaje"=>"Cuenta creada correctamente."
    ]);

}else{

    echo json_encode([
        "estado"=>"error",
        "mensaje"=>"No se pudo registrar."
    ]);

}

$stmt->close();

$conexion->close();

?>