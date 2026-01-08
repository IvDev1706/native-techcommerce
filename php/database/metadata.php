<?php
    //tablas de la base de datos
    const USERTABLE = "Users";
    const CLIENTSTABLE = "Clients";
    const SELLERSTABLE = "Sellers";
    const ADMINSTABLE = "Admins";
    const PRODUCTTABLE = "Product";
    const ORDERSTABLE = "Orders";
    const PRODUCTLISTTABLE = "ProductList";

    //columnas de cada tabla
    enum USERCOLUMNS:string {
        case ID = "id";
        case NAME = "user_name";
        case MAIL = "user_mail";
        case PASS = "user_pass";
    }

    enum PRODUCTCOLUMNS:string {
        case ID = "id";
        case NAME = "product_name";
        case DESC = "product_desc";
        case UNITS = "product_units";
        case PRICE = "product_price";
        case SELLER = "product_seller";
    }

    enum ORDERCOLUMNS:string {
        case ID = "id";
        case DATE = "order_date";
        case STATUS = "order_status";
        case AMOUNT = "order_amount";
        case USER = "order_user";
    }

    enum PRODUCTLISTCOLUMNS:string {
        case ID = "id";
        case ORDER = "ord";
        case PRODUCT = "product";
        case UNITS = "units";
    }

    //secuencias de tipos
    const USERTYPES = "sss";
    const PRODUCTTYPES = "ssiii";
    const PRODUCTTYPES_UPDATE = "ssii";
    const ORDERTYPES = "ssii";
    const PRODUCTLISTTYPES = "iii";
?>