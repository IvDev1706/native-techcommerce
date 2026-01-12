import { get_user, update_user } from "../../services/user_service.js";
import { Box } from '../../components/boxes.js';
import { Form, Label, Input } from "../../components/forms.js";
import Button from "../../components/buttons.js";

//contenedor de producto
const user_cont = document.getElementById("user-cont");
//formulario de busqueda
const search_form = document.getElementById("search-form");

//manejar la eliminacion del producto
function handleUpdate(data){
    //mandar al api
    update_user(data).then(res=>{
        console.log(data);
        //verificar respuesta
        if(res){
            //mensaje de exito
            alert("usuario actualizado!!!")
            //redireccion
            window.open("/html/adminPages/dash.html","_self");
        }else{
            //mensaje de error
            alert("Error al actualizar usuario");
        }
    }).catch(err=>console.error(err));
}

//manejar el envio del formulario de busqueda
function handleSearch(e){
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
        //contenedor de formulario
        const box = Box();

        //formulario de producto
        const form = Form();

        //campos de producto
        const fldId = Input("id","hidden");
        fldId.value = usr.id;
        const lblName = Label("name","Nombre de usuario:");
        const fldName = Input("name","text");
        fldName.maxLength = 15;
        fldName.value = usr.name;
        const lblPass = Label("pass","Contraseña:");
        const fldPass = Input("pass","password");
        fldPass.maxLength = 10;
        fldPass.value = usr.pass;
        const lblMail = Label("mail","Correo:");
        const fldMail = Input("mail","email");
        fldMail.maxLength = 35;
        fldMail.value = usr.mail;

        //boton de submit
        const btn = Button("actualizar","agree",true);

        //añadir todo al formulario
        form.appendChild(fldId);
        form.appendChild(lblName);
        form.appendChild(fldName);
        form.appendChild(lblPass);
        form.appendChild(fldPass);
        form.appendChild(lblMail);
        form.appendChild(fldMail);
        form.appendChild(btn);

        //escucha para manejar el envio
        form.addEventListener("submit",(e) => {
            //prevenir recargo
            e.preventDefault();

            //obtener datos del formulario
            const dataU = new FormData(e.target);

            //manejar el update
            handleUpdate(dataU);
        });

        //añadir a la caja
        box.appendChild(form);

        //añadir a la seccion
        user_cont.appendChild(box);
    }).catch(err=>console.error(err));
}

//agregar escucha
search_form.addEventListener("submit",e =>{ handleSearch(e) });