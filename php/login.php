<?php

session_start();

require_once "conexion.php";

header("Content-Type: application/json");

if($_SERVER["REQUEST_METHOD"] != "POST"){

    echo json_encode([
        "estado" => "error",
        "mensaje" => "Acceso denegado."
    ]);

    exit;
}

$correo = trim($_POST["correo"] ?? "");
$password = $_POST["password"] ?? "";

if(empty($correo) || empty($password)){

    echo json_encode([
        "estado" => "error",
        "mensaje" => "Complete todos los campos."
    ]);

    exit;
}

$sql = "SELECT idusuarioPrimaria, nombre, correo, contraseña, rol
        FROM usuarios
        WHERE correo = ?
        LIMIT 1";

$stmt = $conexion->prepare($sql);

$stmt->bind_param("s", $correo);

$stmt->execute();

$resultado = $stmt->get_result();

if($resultado->num_rows === 1){

    $usuario = $resultado->fetch_assoc();

    if(password_verify($password, $usuario["contraseña"])){

        session_regenerate_id(true);

        $_SESSION["id"] = $usuario["idusuarioPrimaria"];
        $_SESSION["nombre"] = $usuario["nombre"];
        $_SESSION["rol"] = $usuario["rol"];

        if($usuario["rol"] === "admin"){

    echo json_encode([
        "estado" => "ok",
        "redireccion" => "../html/admin.html"
    ]);

}else{

  echo json_encode([
    "estado" => "ok",
    "redireccion" => "../html/principal.html"
]);

}

    }else{

        echo json_encode([
            "estado" => "error",
            "mensaje" => "Correo o contraseña incorrectos."
        ]);

    }

}else{

    echo json_encode([
        "estado" => "error",
        "mensaje" => "Correo o contraseña incorrectos."
    ]);

}

$stmt->close();
$conexion->close();

?>