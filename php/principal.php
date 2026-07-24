<?php

require_once("conexion.php");

$sql = "SELECT * FROM eventos ORDER BY fecha ASC, hora ASC";

$resultado = $conexion->query($sql);

$eventos = [];

if($resultado){

    while($fila = $resultado->fetch_assoc()){

        $eventos[] = $fila;

    }

}

header("Content-Type: application/json; charset=utf-8");

echo json_encode($eventos);

$conexion->close();

?>