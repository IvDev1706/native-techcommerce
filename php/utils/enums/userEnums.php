<?php
    /**
     * Tipos de rol de usuario
     */
    enum UserRoles:string{
        case ADMIN = "admin";
        case CLIENT = "cliente";
        case SELLER = "vendedor";
    }

    /**
     * Acciones de API de usuario
     */
    enum UserActions:string{
        case LOGIN = "login";
        case GET = "list";
        case ADD = "signup";
        case MODIFY = "update";
        case DROP = "delete";
    }
?>