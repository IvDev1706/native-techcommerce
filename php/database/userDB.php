<?php 
    include 'dbconnection.php';
    include '../utils/enums.php';

    /**
     * ### Api de usuarios ###
     * aqui se se encuentran los metodos
     * que permiten realizar operaciones
     * en la base de datos en torno a
     * usuarios
     */

    //validar acceso
    function validate_access(string $username, string $password):array|false|null{
        //obtener conexion
        $conn = DBConnection::getInstance();

        //buscar en la tabla de usuarios
        $result = $conn->query("SELECT id, user_name FROM Users WHERE user_name = '$username' and user_pass = '$password'");
        $user = $result->fetch_assoc();

        //buscar el rol en caos de que exista
        if($user){
            //buscar en admins primero
            $r = $conn->query("SELECT EXISTS (SELECT 1 FROM Admins WHERE id = ".$user['id'].");");
            $admin = $r->fetch_row()[0];
            $r = $conn->query("SELECT EXISTS (SELECT 1 FROM Sellers WHERE id = ".$user['id'].");");
            $seller = $r->fetch_row()[0];
            if($admin){
                $user['user_role'] = UserRoles::ADMIN->value;
            }else if($seller){
                $user['user_role'] = UserRoles::SELLER->value;
            }else{
                $user['user_role'] = UserRoles::CLIENT->value;
            }
        }

        //obtener el usuario
        return $user;
    }

    //registrar usuario
    function register_user(array $user):bool{
        //obtener conexion
        $conn = DBConnection::getInstance();

        //statement
        $stmt = "INSERT INTO Users(user_name,user_pass,user_mail) VALUES ("."'".$user['name']."','".$user['pass']."','".$user['mail']."')";

        //ejecutar la insercion
        if($conn->query($stmt)){
            //segun el rol
            switch($user['role']){
                case UserRoles::ADMIN->value:
                    //insertar en tabla de administradores
                    return $conn->query("INSERT INTO Admins VALUES (LAST_INSERT_ID())");
                case UserRoles::SELLER->value:
                    //insertar en tabla de vendedores
                    return $conn->query("INSERT INTO Sellers VALUES (LAST_INSERT_ID())");
                default:
                    //insertar en tabla de administradores
                    return $conn->query("INSERT INTO Clients VALUES (LAST_INSERT_ID())");
            }
        }

        return false;
    }
?>