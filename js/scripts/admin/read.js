import { get_users } from "../../services/user_service.js";
import { UserBox } from '../../components/boxes.js';

//obtener el contenedor
const user_cont = document.getElementById("user-cont");

//fragmento de de productos
const frag = document.createDocumentFragment();

//limpiar contenedor
while(user_cont.firstChild){
    //eliminar hijos
    user_cont.removeChild(user_cont.firstChild);
}

//pedir productos
get_users(0).then((users)=>{
    //guardar usuarioss en el fragmento
    for (const usr of users) {
        //crear caja y agregar al fragmento
        frag.appendChild(UserBox(usr));
    }
    //añadir el fragmento al elemento
    user_cont.appendChild(frag);
}).catch(err=>console.error(err));