<?php
    include 'dbconnection.php';
    include 'metadata.php';

    /**
     * ### Repositorio de ordenes ###
     * aqui se se encuentran los metodos
     * que permiten realizar operaciones
     * en la base de datos en torno a
     * ordenes de producto
     */

    class OrderRepository{
        //******* Atributos *******//
        private DBConnection $driver;

        //******* Metodo constructor *******//
        public function __construct(){
            //objeto de conexion
            $this->driver = DBConnection::getInstance();
        }
        //******* Funciones de repositorio *******//
        public function get_orders_by_user(int $user, int $page = 0):array{
            //verificar el driver
            if(!$this->driver){
                return [];
            }

            //obtener del driver
            return $this->driver->select_from(
                ORDERSTABLE,
                [
                    ORDERCOLUMNS::ID->value,
                    ORDERCOLUMNS::DATE->value." as 'date'",
                    ORDERCOLUMNS::STATUS->value." as status",
                    ORDERCOLUMNS::AMOUNT->value." as amount"
                ],
                ORDERCOLUMNS::USER->value." = ".$user
            );
        }

        public function get_order_info(int $id):array|null{
            //verificar el driver
            if(!$this->driver){
                return [];
            }

            //obtener del driver
            $res = $this->driver->select_from(
                ORDERSTABLE,
                [
                    ORDERCOLUMNS::ID->value,
                    ORDERCOLUMNS::DATE->value." as 'date'",
                    ORDERCOLUMNS::STATUS->value." as status",
                    ORDERCOLUMNS::AMOUNT->value." as amount"
                ],
                ORDERCOLUMNS::ID->value." = ".$id
            );

            //retornar elemento
            return count($res) ? $res[0] : null;
        }

        public function get_products_by_order(int $order):array{
            //verificar el driver
            if(!$this->driver){
                return [];
            }

            //obtener del driver
            return $this->driver->select_from(
                PRODUCTLISTTABLE." as pl join ".PRODUCTTABLE." as p on pl.".PRODUCTLISTCOLUMNS::PRODUCT->value." = p.".PRODUCTCOLUMNS::ID->value,
                [
                    "p.".PRODUCTCOLUMNS::ID->value,
                    "p.".PRODUCTCOLUMNS::NAME->value." as 'name'",
                    "p.".PRODUCTCOLUMNS::PRICE->value." as price",
                    "pl.".PRODUCTLISTCOLUMNS::UNITS->value
                ],
                PRODUCTLISTCOLUMNS::ORDER->value." = ".$order
            );
        }

        public function register_order(array $order):bool{
            //verificar el driver
            if(!$this->driver){
                return false;
            }

            //insertar datos de orden
            $order_id = $this->driver->insert_into(
                    ORDERSTABLE,
                    [
                        $order['date'],
                        $order['status'],
                        $order['amount'],
                        $order['user']
                    ],
                    ORDERTYPES,
                    [
                        ORDERCOLUMNS::DATE->value,
                        ORDERCOLUMNS::STATUS->value,
                        ORDERCOLUMNS::AMOUNT->value,
                        ORDERCOLUMNS::USER->value
                    ],
            );

            if($order_id){
                //inertar productos
                foreach($order['products'] as $prod){
                    $i = $this->driver->insert_into(
                        PRODUCTLISTTABLE,
                        [
                            $order_id,
                            $prod['id'],
                            $prod['units']
                        ],
                        PRODUCTLISTTYPES,
                        [
                            PRODUCTLISTCOLUMNS::ORDER->value,
                            PRODUCTLISTCOLUMNS::PRODUCT->value,
                            PRODUCTLISTCOLUMNS::UNITS->value,
                        ],
                    );
                    if(!$i){
                        return false;
                    }
                }
                return true;
            }

            return false;
        }
    }
?>