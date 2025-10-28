import { validateAccess } from "../services/user_service.js";

//funcion de evento
function handleSubmit(e){
    //prevenir el recargo
    e.preventDefault();

    //obtener el formd data
    const data = new FormData(e.target);

    //mandar a php
    validateAccess(data).then(res => {
        //validar los datos
        if(!res){
            //mostrar mensaje de error
            document.getElementById("error-msg").innerText="Acceso invalido: usuario o contraseña incorrecto";
            //finalizar
            return;
        }

        //definir la cookie
        let fecha = new Date();
        fecha.setTime(fecha.getTime()+(86400*1000));
        sessionStorage.setItem("session",JSON.stringify(res));

        //redirigir segun sea el caso
        switch(res.user_role){
            case "seller":
                window.open("/techcommerce/html/sellerPages/home.html","_self");
                break;
            case "admin":
                window.open("/techcommerce/html/adminPages/dash.html","_self");
                break;
            default:
                window.open("/techcommerce/html/clientPages/home.html","_self");
                break;
        }
    }).catch(err => console.log(err));
}

//añadir el evento
document.getElementById("login-form").addEventListener("submit",e => handleSubmit(e));