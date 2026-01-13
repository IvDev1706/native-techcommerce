//obtener listado de ordenes
export async function get_orders(page, user){
    //construir la url
    const url = "/php/apis/orderAPI.php?action=list&page="+page+"&usr="+user;

    //peticion con fetch
    const response = await fetch(url,{
        method:"GET",
        mode:"cors"
    });

    //verificar estatus
    if(!response.ok){
        //retorna una lista vacia
        return [];
    }

    //retornamos los productos
    return await response.json();
}

//obtener productos de una orden
export async function get_order_products(ord){
    //construir la url
    const url = "/php/apis/orderAPI.php?action=products&ord="+ord;

    //peticion con fetch
    const response = await fetch(url,{
        method:"GET",
        mode:"cors"
    });

    //verificar estatus
    if(!response.ok){
        //retorna una lista vacia
        return [];
    }

    //retornamos los productos
    return await response.json();
}

//registrar un nueva orden
export async function register_order(data){
    //peticion con fetch
    const response = await fetch("/php/apis/orderAPI.php?action=register",{
        method: "POST",
        mode: "cors",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(data)
    });

    //verificar estatus
    if(!response.ok){
        //retorna falso
        return false;
    }

    //retornar verdadero
    return true;
}