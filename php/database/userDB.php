<?php 
    include 'dbconnection.php';
    include 'metadata.php';

    /**
     * ### Repositorio de usuarios ###
     * aqui se se encuentran los metodos
     * que permiten realizar operaciones
     * en la base de datos en torno a
     * usuarios
     */

    class UserRepository{
        //******* Atributos *******//
        private DBConnection $driver;

        //******* Metodo constructor *******//
        public function __construct(){
            //objeto de conexion
            $this->driver = DBConnection::getInstance();
        }

        //******* funciones de repositorio *******//
        //validar acceso
        public function validate_access(string $username, string $password):array|null{
            if(!$this->driver){
                return null;
            }

            //buscar en la tabla de usuarios
            $res = $this->driver->select_from(USERTABLE,[USERCOLUMNS::ID->value,USERCOLUMNS::NAME->value,USERCOLUMNS::MAIL->value],USERCOLUMNS::NAME->value." = '$username' and ".USERCOLUMNS::PASS->value." = '$password'");

            //verificar que existe
            if(!count($res)){
                return null;
            }

            //objeto de usuario
            $user = [
                "id"=>$res[0][USERCOLUMNS::ID->value],
                "name"=>$res[0][USERCOLUMNS::NAME->value],
                "mail"=>$res[0][USERCOLUMNS::MAIL->value]
            ];

            //definir el rol del usuario
            if($this->driver->select_exists(ADMINSTABLE,USERCOLUMNS::ID->value." = ".$user[USERCOLUMNS::ID->value])){
                $user['role'] = UserRoles::ADMIN->value;
            }else if($this->driver->select_exists(SELLERSTABLE,USERCOLUMNS::ID->value." = ".$user[USERCOLUMNS::ID->value])){
                $user['role'] = UserRoles::SELLER->value;
            }else{
                $user['role'] = UserRoles::CLIENT->value;
            }

            //obtener el usuario
            return $user;
        }

        //registrar usuario
        public function register_user(array $user):bool{

            if(!$this->driver){
                return false;
            }

            //ejecutar sentencia
            $res = $this->driver->insert_into(USERTABLE,[$user['name'],$user['pass'],$user['mail']],USERTYPES,[USERCOLUMNS::NAME->value,USERCOLUMNS::PASS->value,USERCOLUMNS::MAIL->value]);

            //ejecutar la insercion en tabla hija
            if($res){
                //segun el rol
                switch($user['role']){
                    case UserRoles::ADMIN->value:
                        //insertar en tabla de administradores
                        return $this->driver->insert_into(ADMINSTABLE,["LAST_INSERT_ID()"],"i");
                    case UserRoles::SELLER->value:
                        //insertar en tabla de vendedores
                        return $this->driver->insert_into(SELLERSTABLE,["LAST_INSERT_ID()"],"i");
                    default:
                        //insertar en tabla de administradores
                        return $this->driver->insert_into(CLIENTSTABLE,["LAST_INSERT_ID()"],"i");
                }
            }

            return false;
        }

        //modificar datos de cuenta
        public function update_user(array $user):bool{
            //ejecutar sentencia
            return $this->driver->update_set(USERTABLE,[USERCOLUMNS::NAME->value,USERCOLUMNS::PASS->value,USERCOLUMNS::MAIL->value],$user,USERTYPES,USERCOLUMNS::ID->value." = ".$user[USERCOLUMNS::ID->value]);
        }

        //eliminar cuenta
        function delete_user(int $id):bool{
            //ejecutar la eliminacion
            return $this->driver->delete_from(USERTABLE,USERCOLUMNS::ID->value." = ".$id);
        }

        //obtener cuentas
        function get_users(int $pg):array{
            return $this->driver->select_from(USERTABLE,$fields=[USERCOLUMNS::ID->value,USERCOLUMNS::NAME->value,USERCOLUMNS::MAIL->value],$page=$pg);
        }
    }
?>