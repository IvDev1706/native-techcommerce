<?php 
    include 'php/database/userApi.php';
    include 'php/utils/enums.php';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styling.css" type="text/css">
    <title>techcommerce - login</title>
</head>
<body style="background-color: #48e;">
    <div style="width: 450px;" class="centered-box">
        <form class="column-layout" action="<?php echo $_SERVER['PHP_SELF'];?>" method="POST">
            <h2 class="centered-text">Techcommerce - login</h2>
            <label for="username">Nombre de usuario:</label><br>
            <input class="inpt" type="text" name="username" required>
            <label for="password">Contraseña:</label><br>
            <input class="inpt" type="password" name="password" required>
            <button class="btn" type="submit">Acceder</button>
        </form>
        <?php
            if(isset($_POST['username']) && isset($_POST['password'])){
                //limpieza de datos
                $u_name = stripslashes(htmlspecialchars($_POST['username']));
                $u_pass = stripslashes(htmlspecialchars($_POST['password']));

                //esperar resultado
                $user = validate_access($u_name,$u_pass);
                //redirigir segun sea el caso
                if($user){
                    switch($user['user_role']){
                        case UserRoles::ADMIN->value:
                            header("Location: /techcommerce/html/adminPages/dash.php");
                            break;
                        case UserRoles::SELLER->value:
                            header("Location: /techcommerce/html/sellerPages/home.php");
                            break;
                        default:
                            header("Location: /techcommerce/html/clientPages/home.php");
                            break;
                    }
                    //generar la cookie
                    setcookie("session",json_encode($user),time()+86400,'/');
                }else{
                    echo"<p class=\"danger-text\">Acceso invalido: usuario o contraseña incorrecto</p>";
                }
            }
        ?>
        <p class="centered-text">
            <a class="link" href="html/signup.php">¿No tienes cuenta?, crea una</a>
        </p>
    </div>
</body>
</html>