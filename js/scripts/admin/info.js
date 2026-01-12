import { get_user } from '../../services/user_service.js';
import { UserBox } from '../../components/boxes.js';

//contenedor de producto
const user_cont = document.getElementById("user-cont");

//limpiar el contenedor
while(user_cont.firstChild){
    //eliminar primer hijo
    user_cont.removeChild(user_cont.firstChild);
}

//api de parametros
const id = new URLSearchParams(location.search).get("id")

//verficar url
if(id){
    //si la url existe se pide la informacion al api
    get_user(id).then((usr)=>{
        //añadir la caja de informacion
        user_cont.appendChild(UserBox(usr));
    }).catch(err=>console.log(err));
}else{
    user_cont.innerText = "direccion invalida, no se puede visualizar un usuario";
}