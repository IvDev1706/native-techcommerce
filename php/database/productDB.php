<?php
    include 'dbconnection.php';
    include 'metadata.php';

    /**
     * ### Repositorio de productos ###
     * aqui se se encuentran los metodos
     * que permiten realizar operaciones
     * en la base de datos en torno a
     * productos
     */

    class ProductRepository{
        //******* Atributos *******//
        private DBConnection $driver;

        //******* Metodo constructor *******//
        public function __construct(){
            //objeto de conexion
            $this->driver = DBConnection::getInstance();
        }

        //******* Funciones de repositorio *******//
        //obtener productos paginados
        public function get_products(int $page, int $seller_id = 0):array{
            //sentencia de sql
            if($seller_id != 0){
                return $this->driver->select_from(PRODUCTTABLE,[PRODUCTCOLUMNS::ID->value,PRODUCTCOLUMNS::NAME->value." as 'name'",PRODUCTCOLUMNS::UNITS->value." as units"],PRODUCTCOLUMNS::SELLER->value." = ".$seller_id);
            }else{
                return $this->driver->select_from(PRODUCTTABLE,[PRODUCTCOLUMNS::ID->value,PRODUCTCOLUMNS::NAME->value." as 'name'",PRODUCTCOLUMNS::UNITS->value." as units"]);
            }
        }

        public function get_product_info(int $id):array | null{
            //ejecutar la sentencia
            $res = $this->driver->select_from(PRODUCTTABLE,[PRODUCTCOLUMNS::ID->value,PRODUCTCOLUMNS::NAME->value." as 'name'",PRODUCTCOLUMNS::DESC->value." as 'desc'",PRODUCTCOLUMNS::UNITS->value." as units",PRODUCTCOLUMNS::PRICE->value." as price"],PRODUCTCOLUMNS::ID->value." = ".$id);

            return count($res) ? $res[0] : null;
        }

        public function create_product(array $product):bool{
            //retornar el valor
            return $this->driver->insert_into(PRODUCTTABLE,[$product['name'],$product['desc'],$product['units'],$product['price'],$product['seller']],PRODUCTTYPES,[PRODUCTCOLUMNS::NAME->value,PRODUCTCOLUMNS::DESC->value,PRODUCTCOLUMNS::UNITS->value,PRODUCTCOLUMNS::PRICE->value,PRODUCTCOLUMNS::SELLER->value]);
        }

        public function update_product(array $product):bool{
            //retornar el valor
            return $this->driver->update_set(PRODUCTTABLE,[PRODUCTCOLUMNS::NAME->value,PRODUCTCOLUMNS::DESC->value,PRODUCTCOLUMNS::UNITS->value,PRODUCTCOLUMNS::PRICE->value],[$product['name'],$product['desc'],$product['units'],$product['price']],PRODUCTTYPES_UPDATE,PRODUCTCOLUMNS::SELLER->value." = ".$product['seller']);
        }

        public function delete_product(int $id){
            //retornar el valor
            return $this->driver->delete_from(PRODUCTTABLE,PRODUCTCOLUMNS::ID->value." = ".$id);
        }

        public function discount_units(array $prlist):void{
            //aplicar descuentos
            foreach($prlist as $pr){
                if(!$this->driver->decrement(
                    PRODUCTTABLE,
                    PRODUCTCOLUMNS::UNITS->value,
                    $pr['units'],
                    PRODUCTCOLUMNS::ID->value." = ".$pr['id']
                )){
                    throw new Exception("error al actualizar unidades");
                }
            }
        }
    }
?>