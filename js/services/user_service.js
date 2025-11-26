//validar un login
export async function validateAccess(data){
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
export async function registerUser(data){
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