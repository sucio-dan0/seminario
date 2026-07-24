<?php

require_once("conexion.php");

header("Content-Type: application/json; charset=utf-8");


if(!isset($_GET["id"])){

    echo json_encode([
        "error"=>"No llegó el ID"
    ]);

    exit;

}



$id = $_GET["id"];



$sql = "SELECT * FROM eventos WHERE idevento = ?";



$stmt = $conexion->prepare($sql);



if(!$stmt){

    echo json_encode([
        "error"=>"Error preparando consulta: ".$conexion->error
    ]);

    exit;

}



$stmt->bind_param("i",$id);



$stmt->execute();



$resultado = $stmt->get_result();



if($evento = $resultado->fetch_assoc()){


    echo json_encode($evento);



}else{


    echo json_encode([
        "error"=>"No existe evento con id ".$id
    ]);

}



$stmt->close();

$conexion->close();


?>