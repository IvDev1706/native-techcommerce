<?php 
    include '../php/database/userApi.php'; 
    include '../php/utils/enums.php';
?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styling.css" type="text/css">
    <title>techcommerce - signup</title>
</head>
<body style="background-color: #48e;">
    <div style="width: 450px;" class="centered-box">
        <form class="column-layout" action="<?php echo $_SERVER['PHP_SELF'];?>" method="POST">
            <h2 class="centered-text">Techcommerce - registro</h2>
            <label for="name">Nombre de usuario:</label><br>
            <input class="inpt" type="text" name="name" required>
            <label for="pass">Contraseña:</label><br>
            <input class="inpt" type="password" name="pass" required>
            <label for="mail">Correo:</label><br>
            <input class="inpt" type="email" name="mail" required>
            <label for="role">¿Que realizara?</label><br>
            <select name="role">
                <option value="<?= UserRoles::CLIENT->value ?>">comprar</option>
                <option value="<?= UserRoles::SELLER->value ?>">vender</option>
            </select>
            <button class="btn" type="submit">registrar</button>
        </form>
        <?php
            if(count($_POST)){
                //limpieza de datos
                $user = [
                    "name" => stripslashes(htmlspecialchars($_POST["name"])),
                    "pass" => $_POST["pass"],
                    "mail" => $_POST["mail"],
                    "role" => $_POST["role"],
                ];
                
                //mandar a bd
                if(register_user($user)){
                    //redireccion al login
                    header("Location: /techcommerce/index.php");
                }else{
                    echo "<p class=\"danger-text\">Cuenta no creada, ha ocurrido un error</p>";
                }
            }
        ?>
    </div>
</body>
</html>