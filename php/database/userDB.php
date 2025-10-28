<?php 
    include 'dbconnection.php';

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

        //buscar en la tabla
        $result = $conn->query("SELECT user_name, user_role FROM Users WHERE user_name = '$username' and user_pass = '$password'");

        //obtener el usuario
        return $result->fetch_assoc();
    }

    //registrar usuario
    function register_user(array $user):bool{
        //obtener conexion
        $conn = DBConnection::getInstance();

        //ejecutar la insercion
        return $conn->query("INSERT INTO Users(user_name,user_pass,user_mail,user_role) VALUES ("."'".$user['name']."','".$user['pass']."','".$user['mail']."','".$user['role']."')");
    }
?>