<?php
    /**
     * ### Conexion a BD ###
     * clase de conexion a base de datos
     * con patron de diseño singleton.
     */
    class DBConnection {
        //unica instancia
        private static ?mysqli $conn = null;
        private const SERVER = "localhost";
        private const USERNAME = "root";
        private const PASSWORD = "";
        private const DATABASE = "techcommerce";
        private const PORT = "3308";

        //constructor
        private function __construct(){}

        //funcion de singleton
        public static function getInstance():mysqli{
            //verificar so no hay instancia
            if(!self::$conn){
                //instanciarla
                self::$conn = new mysqli(
                    self::SERVER,
                    self::USERNAME,
                    self::PASSWORD,
                    self::DATABASE,
                    self::PORT);

                //verificar error de conexion
                if(self::$conn->connect_error){
                    die("Error de conexion: ".self::$conn);
                }
            }

            //retorno de instancia
            return self::$conn;
        }
    }
?>
