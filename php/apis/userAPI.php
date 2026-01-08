<?php
    //incluir cors
    include 'cors.php';
    //api de usuario
    include '../database/userDB.php';
    //enum de acciones
    include '../utils/enums/userEnums.php';

    //instancia de repositorio
    $repo = new UserRepository();

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
        switch($_GET['action']){
            case UserActions::LOGIN->value;
                //validar el login
                $user = $repo->validate_access($_POST['username'],$_POST['password']);
                //validar respuesta
                if(!$user){
                    //login invalido
                    http_response_code(404);
                    //cuerpo
                    echo json_encode(["detail"=>"acceso invalido"]);
                    exit;
                }
                //respuesta GET (como echo)
                echo json_encode($user);
                break;
            case UserActions::ADD->value:
                //insertar usuario
                $res = $repo->register_user($_POST);
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
                break;
            case UserActions::MODIFY->value:
                //realizar cambios
                $res = $repo->update_user($_POST);
                //validar respuesta
                if(!$res){
                    //actualizacion invalida
                    http_status_code(500);
                    //cuerpo
                    echo json_encode(["detail"=>"cambios no realizados"]);
                    exit;
                }
                //respuesta get
                echo json_decode(["msg"=>"cambios realizados"]);
                break;
            case UserActions::DROP->value:
                //eliminar usuario
                $res = $repo->delete_user($_GET['id']);
                //validar respuesta
                if(!$res){
                    //eliminacion invalida
                    http_status_code(500);
                    //cuerpo
                    echo json_encode(["detail"=>"la cuenta no se ha borrado"]);
                    exit;
                }
                //respuesta get
                echo json_decode(["msg"=>"cuenta eliminada"]);
                break;
            case UserActions::GET->value:
                //obtener usuarios
                echo json_decode($repo->get_users($_GET['page']));
                break;
            default:
                //action invalida
                http_response_code(404);
                echo json_encode(["detail"=>"accion invalida"]);
                break;
        }
    }catch(Exception $e) {
        //error 500
        http_response_code(500);
        echo json_encode(["detail"=>"Error interno de servidor"]);
        exit;
    }
?>