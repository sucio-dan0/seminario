<?php

session_start();

require_once("conexion.php");

header("Content-Type: application/json; charset=utf-8");


if(!isset($_POST["id"]) || !isset($_POST["cantidad"])){

    echo json_encode([
        "error"=>"Faltan datos de compra"
    ]);

    exit;

}


if(!isset($_SESSION["id"])){

    echo json_encode([
        "error"=>"Usuario no iniciado"
    ]);

    exit;

}


$idusuario=$_SESSION["id"];

$id=$_POST["id"];

$cantidad=$_POST["cantidad"];



// Revisar boletos disponibles

$sql="SELECT boletos FROM eventos WHERE idevento=?";

$stmt=$conexion->prepare($sql);

$stmt->bind_param("i",$id);

$stmt->execute();

$resultado=$stmt->get_result();



if($evento=$resultado->fetch_assoc()){


    if($evento["boletos"] < $cantidad){

        echo json_encode([
            "error"=>"No hay suficientes boletos disponibles"
        ]);

        exit;

    }


}else{

    echo json_encode([
        "error"=>"El evento no existe"
    ]);

    exit;

}



// Restar boletos

$sql="UPDATE eventos 
SET boletos = boletos - ?
WHERE idevento=?";


$stmt=$conexion->prepare($sql);

$stmt->bind_param("ii",$cantidad,$id);



if(!$stmt->execute()){

    echo json_encode([
        "error"=>"No se pudo actualizar los boletos"
    ]);

    exit;

}



// Generar código del boleto

$codigo="EXP-".strtoupper(substr(md5(uniqid()),0,12));



// Guardar boleto del usuario

$sql="INSERT INTO boletos(idusuario,idevento,cantidad,codigo)
VALUES(?,?,?,?)";


$stmt=$conexion->prepare($sql);

$stmt->bind_param(
    "iiis",
    $idusuario,
    $id,
    $cantidad,
    $codigo
);



if($stmt->execute()){


    echo json_encode([

        "mensaje"=>"Compra realizada correctamente",

        "codigo"=>$codigo

    ]);


}else{


    echo json_encode([

        "error"=>"No se pudo guardar el boleto"

    ]);


}



$stmt->close();

$conexion->close();


?>