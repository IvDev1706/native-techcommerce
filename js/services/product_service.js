//obtener listado de productos
export async function get_products(page, seller=0){
    //construir la url
    const url = seller != 0 ? "/php/apis/productAPI.php?action=list&page="+page+"&seller="+seller : "/php/apis/productAPI.php?action=list&page="+page;

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

export async function get_product(id){
    
}

//registrar un nuevo producto
export async function register_product(data){
    //peticion con fetch
    const response = await fetch("/php/apis/productAPI.php?action=register",{
        method: "POST",
        mode: "cors",
        body: data
    });

    //verificar estatus
    if(!response.ok){
        //retorna falso
        return false;
    }

    //retornar verdadero
    return true;
}