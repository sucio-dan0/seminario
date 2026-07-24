<?php

session_start();

require_once("conexion.php");

header("Content-Type: application/json; charset=utf-8");


if(!isset($_SESSION["id"])){

echo json_encode([
"error"=>"Usuario no iniciado"
]);

exit;

}


$idusuario=$_SESSION["id"];


$sql="
SELECT 
boletos.codigo,
boletos.cantidad,
eventos.nombre,
eventos.lugar,
eventos.fecha,
eventos.hora,
eventos.imagen
FROM boletos
INNER JOIN eventos
ON boletos.idevento=eventos.idevento
WHERE boletos.idusuario=?
ORDER BY boletos.idboleto DESC
";


$stmt=$conexion->prepare($sql);

$stmt->bind_param("i",$idusuario);

$stmt->execute();


$resultado=$stmt->get_result();


$lista=[];


while($fila=$resultado->fetch_assoc()){

$lista[]=$fila;

}


echo json_encode($lista);


$stmt->close();

$conexion->close();

?>