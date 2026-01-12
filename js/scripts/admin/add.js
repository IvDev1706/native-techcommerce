import { register_user } from "../../services/user_service.js";

//seleccionar formulario
const user_form = document.getElementById("user-form");

//manejo de envio
function handleSubmit(e){
    //prevenir recargo
    e.preventDefault();

    //obtener los datos
    const data = new FormData(e.target);

    //mandar al api
    register_user(data).then((res)=>{
        //verificar resultado
        if(res){
            //mensaje de exito
            alert("Usuario registrado!!!");
            //redirigir a productos
            window.open("/html/adminPages/dash.html","_self");
        }else{
            //mensaje de fracaso
            alert("Error al crear cuenta");
        }
    }).catch(err=>console.log(err));
}

//vincular la escucha
user_form.addEventListener("submit",e => handleSubmit(e));