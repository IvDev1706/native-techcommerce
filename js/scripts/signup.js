import { registerUser } from "../services/user_service.js";

//funcion de evento
function handleSubmit(e){
    //prevenir el recargo
    e.preventDefault();

    //obtener el formd data
    const data = new FormData(e.target);

    //mandar a php
    registerUser(data).then(res => {
        //validar los datos
        if(!res){
            //mostrar mensaje de error
            document.getElementById("error-msg").innerText="Error: no se ha creado la cuenta";
            //finalizar
            return;
        }
        
        //redirigir a login
        window.open("/techcommerce/index.html","_self");
    }).catch(err=>console.log(err));
}

//añadir el evento
document.getElementById("signup-form").addEventListener("submit",e => handleSubmit(e));