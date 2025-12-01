<?php
    //incluir cors
    include 'cors.php';
    //repositorio de producto
    include '../database/productDB.php';
    //enum de aciones
    include '../utils/enums/productEnums.php';

    //cabecera http de JSON
    header("Content-Type: application/json");

    if(!isset($_GET['action'])){
        //si falta el parametro
        http_response_code(404);
        echo json_encode(["detail"=>"ruta invalida"]);
        exit;
    }

    //manejo de errores
    try{
        //endpoints de producto
        switch ($_GET['action']) {
            case ProductActions::GET_ALL->value:
                //obtener productos
                echo json_encode(get_products($_GET['page']));
                break;
            case ProductActions::GET_ONE->value:
                //buscar producto
                $prod = get_product_info($_GET['id']);

                //verificar exito
                if(!count($prod)){
                    //respuesta 404
                    http_response_code(404);
                    //mensaje de error
                    echo json_encode(["detail"=>"producto no encontrado"]);
                }

                //devolver la informacion del producto
                echo json_encode($prod);
                break;
            case ProductActions::ADD->value:
                //mandar datos
                $res = create_product($_POST);
                //validar respuesta
                if(!$res){
                    //respuesta 500
                    http_response_code(500);
                    //mensaje de error
                    echo json_encode(["detail"=>"creacion invalida"]);
                    exit;
                }
                //respuesta exitosa
                echo json_encode(["msg"=>"producto registrado"]);
                break;
            case ProductActions::MODIFY->value:
                //mandar datos
                $res = update_product($_POST);
                //validar respuesta
                if(!$res){
                    //error 500
                    http_response_code(500);
                    //mensaje de error
                    echo json_encode(["detail"=>"modificacion invalida"]);
                    exit;
                }
                echo json_encode(["msg"=>"modificacion realizada"]);
                break;
            case ProductActions::DROP->value:
                //mandar datos
                $res = delete_product($_GET['id']);
                //validar respuesta
                if(!$res){
                    //error 500
                    http_response_code(500);
                    //mensaje de error
                    echo json_encode(["detail"=>"eliminacion invalida"]);
                    exit;
                }
                echo json_encode(["msg"=>"eliminacion realizada"]);
                break;
            default:
                //action invalida
                http_response_code(404);
                echo json_encode(["detail"=>"accion invalida"]);
                break;
        }
    }catch(Exception $e){
        //error 500
        http_response_code(500);
        echo json_encode(["detail"=>"Error interno de servidor"]);
        exit;
    }
?>