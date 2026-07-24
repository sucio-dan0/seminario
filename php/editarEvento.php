<?php

session_start();

require_once("conexion.php");

if($_SERVER["REQUEST_METHOD"]=="GET"){

    header("Content-Type: application/json; charset=utf-8");

    $sql="SELECT * FROM eventos ORDER BY fecha ASC,hora ASC";

    $resultado=$conexion->query($sql);

    $eventos=[];

    while($fila=$resultado->fetch_assoc()){

        $eventos[]=$fila;

    }

    echo json_encode($eventos);

    $conexion->close();
    exit;

}



if($_SERVER["REQUEST_METHOD"]=="POST"){

    $id=$_POST["id"];
    $nombre=$_POST["nombre"];
    $fecha=$_POST["fecha"];
    $hora=$_POST["hora"];
    $lugar=$_POST["lugar"];
    $descripcion=$_POST["descripcion"];
    $boletos=$_POST["boletos"];



    // Obtener imagen actual

    $consulta=$conexion->prepare("SELECT imagen FROM eventos WHERE idevento=?");

    $consulta->bind_param("i",$id);

    $consulta->execute();

    $resultado=$consulta->get_result();

    $evento=$resultado->fetch_assoc();

    $imagen=$evento["imagen"];

    $consulta->close();



    // Si seleccionó una nueva imagen

    if(isset($_FILES["imagen"]) && $_FILES["imagen"]["error"]==0){

        $nombreImagen=time()."_".basename($_FILES["imagen"]["name"]);

        move_uploaded_file(

            $_FILES["imagen"]["tmp_name"],

            "../img/".$nombreImagen

        );

        $imagen=$nombreImagen;

    }



    $sql="UPDATE eventos SET

        nombre=?,
        fecha=?,
        hora=?,
        lugar=?,
        descripcion=?,
        imagen=?,
        boletos=?

        WHERE idevento=?";


    $stmt=$conexion->prepare($sql);

    $stmt->bind_param(

        "ssssssii",

        $nombre,
        $fecha,
        $hora,
        $lugar,
        $descripcion,
        $imagen,
        $boletos,
        $id

    );


    if($stmt->execute()){

        echo "Evento actualizado correctamente.";

    }else{

        echo "Error al actualizar.";

    }

    $stmt->close();

    $conexion->close();

}
?>