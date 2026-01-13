<?php
    //obtener variables de configuracion de bd
    include "../utils/dbconfig.php";

    /**
     * ### Conexion a BD ###
     * clase de conexion a base de datos
     * con patron de diseño singleton.
     */
    class DBConnection {
        //unica instancia
        private static ?DBConnection $db = null;

        //atributos
        private mysqli $con;

        //constructor
        private function __construct(){
            //conector de bd
            $this->con = new mysqli(
                SERVER,
                USERNAME,
                PASSWORD,
                DATABASE,
                PORT
            );

            //verificar error de conexion
            if($this->con->connect_error){
                throw new Exception("Error al conectar a base de datos");
            }
        }

        //consultas preparadas
        public function select_from(string $table, array $fields = ["*"], string $condition = "", int $page = 0):array{
            //preparar la sentencia
            $stmt = "SELECT ".$this->join(", ",$fields);
            $stmt .= " FROM ".$table;
            $stmt .= $condition != "" ? " WHERE ".$condition : "";
            $stmt .= " LIMIT 10 OFFSET ".($page*10).";";

            //ejecutar la query
            $res = $this->con->query($stmt);

            //obtener registros
            $data = [];
            if($res){
                $data = $res->fetch_all(MYSQLI_ASSOC);
                $res->free();
            }

            //retornar datos
            return $data;
        }

        public function select_exists(string $table, string $condition):bool{
            //preparar la sentencia
            $stmt = "SELECT EXISTS (SELECT 1 FROM $table WHERE $condition);";

            //ejecutar la query
            $res = $this->con->query($stmt);

            //obtener resultado
            return $res->fetch_row()[0] ? true : false;
        }

        public function insert_into(string $table, array $values, string $types, ?array $fields = null):int{
            try{
                //preparar el statement
                $stmt = "INSERT INTO ".$table;
                if($fields){
                    $stmt .= "(".$this->join(", ",$fields).")";
                }
                $stmt .= " VALUES (".$this->join(", ",$values,"?").");";

                //preparar para parametros
                $prepared = $this->con->prepare($stmt);

                //escuchar
                $prepared->bind_param($types, ...$values);

                //ejecutar
                $prepared->execute();

                //retornar verdadero
                return $this->con->insert_id;
            }catch(Exception $e){
                return 0;
            }
        }

        public function delete_from(string $table, string $condition):bool{
            try{
                //preparar el statement
                $stmt = "DELETE FROM ".$table." WHERE ".$condition.";";
                //ejecutar la sentencia
                return $this->con->query($stmt);
            }catch(Exception $e){
                return false;
            }
        }

        public function update_set(string $table, array $fields, array $values, string $types, string $condition):bool{
            try{
                //preparar el statement
                $stmt = "UPDATE ".$table;
                $stmt .= " SET ".$this->join(" = ?, ",$fields)." = ?";
                $stmt .= " WHERE ".$condition.";";

                //preparar para parametros
                $prepared = $this->con->prepare($stmt);

                //escuchar
                $prepared->bind_param($types, ...$values);

                //ejecutar
                $prepared->execute();

                //retornar verdadero
                return true;
            }catch(Exception $e){
                return false;
            }
        }

        public function decrement(string $table, string $field, int $amount, string $condition): bool {
            $stmt = "UPDATE $table SET $field = $field - ? WHERE $condition";
            $prepared = $this->con->prepare($stmt);
            $prepared->bind_param("i", $amount);
            return $prepared->execute();
        }

        ///funcion join para concatenrar elementos
        private function join(string $sep, array $values, string $replace = ""):string{
            //contenedor
            $salida = "";
            $limit = count($values)-1;
            //concatenar valores
            foreach($values as $key=>$value){
                if($key < $limit){
                    $salida .= $replace != "" ? $replace . $sep : $value . $sep;
                }else{
                    $salida .= $replace != "" ? $replace : $value;
                }
            }

            return $salida;
        }

        //funcion de singleton
        public static function getInstance():DBConnection | null{
            //manejo de error
            try{
                //verificar la instancia
                if(!self::$db){
                    //instanciar
                    self::$db = new DBConnection();
                }

                //retornar instancia
                return self::$db;
            }catch(Exception $e){
                return null;
            }
        }
    }
?>
