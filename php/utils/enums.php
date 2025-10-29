<?php
    /**
     * Tipos de rol de usuario
     */
    enum UserRoles:string{
        case ADMIN = "admin";
        case CLIENT = "cliente";
        case SELLER = "vendedor";
    }
?>