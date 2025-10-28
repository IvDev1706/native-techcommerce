<?php
    //incluir cors
    include 'cors.php';
    //api de usuario
    include '../database/userDB.php';

    //cabecera http
    header("Content-Type: application/json");

    if(!isset($_GET['action'])){
        //si falta el parametro
        http_response_code(404);
        echo json_encode(["detail"=>"ruta invalida"]);
        exit;
    }

    //manejo de errores
    try{
        //que tipo de peticion esta solicitando
        if($_GET['action'] == 'login'){
            //validar el login
            $user = validate_access($_POST['username'],$_POST['password']);
            
            if(!$user){
                //login invalido
                http_response_code(404);
                //cuerpo
                echo json_encode(["detail"=>"acceso invalido"]);
                exit;
            }

            //respuesta GET (como echo)
            echo json_encode($user);
            exit;
        }else{
            //insertar usuario
            $res = register_user($_POST);
            //respuesta
            if(!$res){
                //registro invalido
                http_response_code(500);
                //cuerpo
                echo json_encode(["detail"=>"cuenta no creada"]);
                exit;
            }

            //respuesta GET (como echo)
            echo json_encode(["msg"=>"cuenta registrada"]);
            exit;
        }
    }catch(Exception $e) {
        //error 500
        http_response_code(500);
        echo json_encode(["detail"=>"Error interno del servidor"]);
        exit;
    }
?>