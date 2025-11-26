<?php
    include 'dbconnection.php';

    /**
     * ### Repositorio de productos ###
     * aqui se se encuentran los metodos
     * que permiten realizar operaciones
     * en la base de datos en torno a
     * productos
     */

    //obtener productos paginados
    function get_products(int $page, int $seller_id = 0):array{
        //obtener conexion a base de datos
        $conn = DBConnection::getInstance();

        //sentencia de sql
        if($seller_id != 0){
            $stmt = "SELECT id, product_name as 'name', product_units as units FROM Product WHERE product_seller = $seller_id LIMIT 10 OFFSET ".($page*10).";";
        }else{
            $stmt = "SELECT id, product_name as 'name', product_units as units FROM Product LIMIT 10 OFFSET ".($page*10).";";
        }
        //ejecutar la sentencia
        $res = $conn->query($stmt);
        $products = [];

        //obtener productos
        if($res){
            $products = $res->fetch_all(MYSQLI_ASSOC);
            $res->free();
        }

        return $products;
    }

    function get_product_info(int $id):array{
        //obtener conexion a base de datos
        $conn = DBConnection::getInstance();

        //preparar la sentencia
        $stmt = "SELECT * FROM Product WHERE id = $id";

        //ejecutar la sentencia
        $res = $conn->query($stmt);

        return $res->fetch_assoc() ?? [];
    }

    function create_product(array $product):bool{
        //obtener conexion a base de datos
        $conn = DBConnection::getInstance();

        //preparar la sentencia
        $stmt = "INSERT INTO Product(product_name,product_desc,product_units,product_price,product_seller) VALUES ('".$product['name']."','".$product['desc']."',".$product['units'].",".$product['price'].",".$product['seller'].");";

        //ejecutar la sentencia
        $res = $conn->query($stmt);

        //retornar el valor
        return $res;
    }

    function update_product(array $product):bool{
        //obtener conexion a base de datos
        $conn = DBConnection::getInstance();

        //preparar la sentencia
        $stmt = "UPDATE Product SET product_name = '".$product['name']."', product_desc = '".$product['desc']."', product_units = ".$product['units'].", product_price = ".$product['price']." WHERE product_seller = ".$product['seller'].";";

        //ejecutar la sentencia
        $res = $conn->query($stmt);

        //retornar el valor
        return $res;
    }

    function delete_product(int $id){
        //obtener conexion a base de datos
        $conn = DBConnection::getInstance();

        //preparar la sentencia
        $stmt = "DELETE FROM Product WHERE id = $id";

        //ejecutar la sentencia
        $res = $conn->query($stmt);

        //retornar el valor
        return $res;
    }

    function discount_units(array $prlist):void{
        //obtener conexion a base de datos
        $conn = DBConnection::getInstance();

        //preparar la sentencia
        $stmt = "";
        $res = null;

        //aplicar descuentos
        foreach($prlist as $pr){
            $stmt = "UPDATE Product SET product_units = product_units - ".$pr['units']." WHERE id = ".$pr['id'].";";
            $res = $conn->query($stmt);
            if(!$res){
                throw new Exception("error al actualizar unidades");
            }
        }
    }
?>