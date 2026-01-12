//validar un login
export async function validate_access(data){
    //peticion con fetch
    const response = await fetch(
        "/php/apis/userAPI.php?action=login",{
        method:"POST",
        mode:"cors",
        body: data
    });

    //verificar resultado
    if(!response.ok){
        return null;
    }

    //caso de exito
    return await response.json();
}

//validar un login
export async function register_user(data){
    //peticion con fetch
    const response = await fetch(
        "/php/apis/userAPI.php?action=signup",{
        method:"POST",
        mode:"cors",
        body:data
    });

    //verificar resultado
    if(!response.ok){
        return false;
    }

    //caso de exito
    return true;
}

//obtener los usuarios
export async function get_users(page){
    //peticion con fetch
    const response = await fetch("/php/apis/userAPI.php?action=list&page="+page,{
        method:"get",
        mode: "cors"
    });

    //verificar resultado
    if(!response.ok){
        return [];
    }

    //retornar usuarios
    return await response.json();
}

//obtener los datos de usuario
export async function get_user(id){
    //peticion con fetch
    const response = await fetch("/php/apis/userAPI.php?action=info&id="+id,{
        method:"get",
        mode: "cors"
    });

    //verificar resultado
    if(!response.ok){
        return null;
    }

    //retornar usuarios
    return await response.json();
}

export async function delete_user(id){
    //peticion con fetch
    const response = await fetch("/php/apis/userAPI.php?action=delete&id="+id,{
        method:"get",
        mode: "cors"
    });

    //verificar resultado
    if(!response.ok){
        return false;
    }

    //retornar usuarios
    return true;
}

export async function update_user(data){
    //peticion con fetch
    const response = await fetch(
        "/php/apis/userAPI.php?action=update",{
        method:"POST",
        mode:"cors",
        body:data
    });

    //verificar estatus
    if(!response.ok){
        //caso de fracaso
        return false;
    }

    //caso de exito
    return true;
}