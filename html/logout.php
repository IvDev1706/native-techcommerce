<?php
    include '../php/database/dbconnection.php';
    //validar la cookie
    if(!isset($_COOKIE['session'])){
        //redireccion a login
        header("Location: /techcommerce/index.php");
    }else{
        //eliminar la cookie
        setcookie("session","",time() - 3600,'/');
        //cerrar conexion abd
        $conn = DBConnection::getInstance();
        $conn->close();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>techcommerce - logout</title>
</head>
<body>
    <h1>Sesion cerrada de forma correcta</h1>
    <hr>
    <a href="/techcommerce/index.php">volver a acceder</a>
</body>
</html>