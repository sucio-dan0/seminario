<?php

require_once("conexion.php");

header("Content-Type: application/json; charset=utf-8");


// LISTAR EVENTOS
if($_SERVER["REQUEST_METHOD"] == "GET"){

    $sql = "SELECT * FROM eventos ORDER BY fecha ASC, hora ASC";

    $resultado = $conexion->query($sql);

    $eventos = [];

    if($resultado){

        while($fila = $resultado->fetch_assoc()){

            $eventos[] = $fila;

        }

    }

    echo json_encode($eventos);

    $conexion->close();

    exit;

}



// ELIMINAR EVENTO
if($_SERVER["REQUEST_METHOD"] == "POST"){

    header("Content-Type: text/plain; charset=utf-8");

    if(!isset($_POST["id"])){

        echo "No se recibió el ID.";

        exit;

    }

    $id = $_POST["id"];

    $sql = "DELETE FROM eventos WHERE idevento = ?";

    $stmt = $conexion->prepare($sql);

    if(!$stmt){

        echo "Error en la consulta.";

        exit;

    }

    $stmt->bind_param("i",$id);

    if($stmt->execute()){

        if($stmt->affected_rows > 0){

            echo "Evento eliminado correctamente.";

        }else{

            echo "No existe ese evento.";

        }

    }else{

        echo "No se pudo eliminar el evento.";

    }

    $stmt->close();
    $conexion->close();

    exit;

}

?>