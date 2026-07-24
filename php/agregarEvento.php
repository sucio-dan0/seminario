<?php

require_once "conexion.php";

header("Content-Type:application/json");


$nombre = $_POST["nombre"];
$fecha = $_POST["fecha"];
$hora = $_POST["hora"];
$lugar = $_POST["lugar"];
$descripcion = $_POST["descripcion"];
$boletos = $_POST["boletos"];



$carpeta = "../img/";


$archivo = time()."_".$_FILES["imagen"]["name"];


move_uploaded_file(

    $_FILES["imagen"]["tmp_name"],

    $carpeta.$archivo

);



$sql = "INSERT INTO eventos(

nombre,
fecha,
hora,
lugar,
descripcion,
imagen,
boletos

)

VALUES(?,?,?,?,?,?,?)";



$stmt = $conexion->prepare($sql);



$stmt->bind_param(

    "ssssssi",

    $nombre,
    $fecha,
    $hora,
    $lugar,
    $descripcion,
    $archivo,
    $boletos

);



if($stmt->execute()){


    echo json_encode([

        "estado"=>"ok",
        "mensaje"=>"Evento agregado correctamente."

    ]);


}else{


    echo json_encode([

        "estado"=>"error",
        "mensaje"=>$stmt->error

    ]);


}



$stmt->close();

$conexion->close();


?>