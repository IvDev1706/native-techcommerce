import { delete_user, get_user } from '../../services/user_service.js';
import { UserBox } from '../../components/boxes.js';
import Button from '../../components/buttons.js';

//contenedor de producto
const user_cont = document.getElementById("user-cont");
//formulario de busqueda
const search_form = document.getElementById("search-form");

//manejar la eliminacion del producto
function handleDrop(id){
    //mandar al api
    delete_user(id).then(res=>{
        //verificar respuesta
        if(res){
            //mensaje de exito
            alert("usuario eliminado!!!")
            //redireccion
            window.open("/html/adminPages/dash.html","_self");
        }else{
            //mensaje de error
            alert("Error al eliminar usuario");
        }
    }).catch(err=>console.error(err));
}


//manejar el envio del formulario
function handleSubmit(e){
    //prevenir recargo de pagina
    e.preventDefault();

    //limpiar el contenedor
    while(user_cont.firstChild){
        //eliminar primer hijo
        user_cont.removeChild(user_cont.firstChild);
    }

    //obtener datos del formulario
    const data = new FormData(e.target);

    //mandar al api
    get_user(data.get("search")).then(usr=>{
        //boton de eliminado
        const dropBtn = Button("eliminar","danger");
        dropBtn.addEventListener("click",e=>handleDrop(usr.id));
        //añadir la caja de informacion
        const ubox = UserBox(usr);
        ubox.childNodes.item(1).appendChild(dropBtn);
        user_cont.appendChild(ubox);

    }).catch(err=>console.error(err));
}

//agregar escucha
search_form.addEventListener("submit",e =>{ handleSubmit(e) });