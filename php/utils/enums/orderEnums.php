<?php
    /**
     * Acciones de API de ordenes
     */
    enum OrderActions:string{
        case GET_ALL = "list";
        case GET_ONE = "info";
        case GET_PRODS = "products";
        case ADD = "register";
    }
?>