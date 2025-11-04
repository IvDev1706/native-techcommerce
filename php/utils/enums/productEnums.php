<?php
    /**
     * Acciones de API de productos
     */
    enum ProductActions:string{
        case GET_ALL = "list";
        case GET_ONE = "info";
        case ADD = "register";
        case MODIFY = "update";
        case DROP = "delete";
    }
?>