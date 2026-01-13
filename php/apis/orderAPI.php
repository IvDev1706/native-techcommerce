<?php
    //incluir cors
    include 'cors.php';
    //api de usuario
    include '../database/orderDB.php';
    //enum de acciones
    include '../utils/enums/orderEnums.php';

    //instancia de repositorio
    $repo = new OrderRepository();

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
            case OrderActions::ADD->value:
                //obtener el json
                $raw = file_get_contents("php://input");
                $data = json_decode($raw,true);

                //insertar usuario
                $res = $repo->register_order($data);
                //respuesta
                if(!$res){
                    //registro invalido
                    http_response_code(500);
                    //cuerpo
                    echo json_encode(["detail"=>"orden no creada"]);
                    exit;
                }

                //respuesta GET (como echo)
                echo json_encode(["msg"=>"orden registrada"]);
                break;
            case OrderActions::GET_ALL->value:
                //obtener ordeness
                echo json_encode($repo->get_orders_by_user($_GET['usr'],$_GET['page']));
                break;
            case OrderActions::GET_PRODS->value:
                //obtener productos
                echo json_encode($repo->get_products_by_order($_GET['ord']));
                break;
            case OrderActions::GET_ONE->value:
                //pedir la orden
                $ord = $repo->get_order_info($_GET['id']);
                //validar orden
                if(!$ord){
                    //usuario no encontrado
                    http_status_code(404);
                    //cuerpo
                    echo json_encode(["detail"=>"la orden no ha sido encontrada"]);
                    exit;
                }
                //regresar usuario
                echo json_encode($ord);
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