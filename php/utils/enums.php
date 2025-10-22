<?php
    /**
     * ### Constantes y valores predefnidos ###
     * Aqui se establecen los enums con valores fijos
     * para opciones de un select, guia de campos, etc.
     */
    //roles de usuario
    enum UserRoles: string {
        case ADMIN = "admin";
        case CLIENT = "client";
        case SELLER = "seller";
    }

?>