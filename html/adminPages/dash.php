<?php
    //validar la cookie
    if(!isset($_COOKIE['session'])){
        //redireccion a login
        header("Location: /techcommerce/index.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/styling.css">
    <title>admin - dashboard</title>
</head>
<body>
    <h1>Dashboard de administrador</h1>
</body>
</html>