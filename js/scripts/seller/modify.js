import { get_product, update_product } from "../../services/product_service.js";
import { Box } from '../../components/boxes.js';
import { Form, Label, Input, TextArea } from "../../components/forms.js";
import Button from "../../components/buttons.js";

//contenedor de producto
const product_cont = document.getElementById("product-cont");
//formulario de busqueda
const search_form = document.getElementById("search-form");

//manejar la eliminacion del producto
function handleUpdate(data){
    //mandar al api
    update_product(data).then(res=>{
        //verificar respuesta
        if(res){
            //mensaje de exito
            alert("producto actualizado!!!")
            //redireccion
            window.open("/html/sellerPages/home.html","_self");
        }else{
            //mensaje de error
            alert("Error al actualizar producto");
        }
    }).catch(err=>console.error(err));
}

//manejar el envio del formulario de busqueda
function handleSearch(e){
    //prevenir recargo de pagina
    e.preventDefault();

    //limpiar el contenedor
    while(product_cont.firstChild){
        //eliminar primer hijo
        product_cont.removeChild(product_cont.firstChild);
    }

    //obtener datos del formulario
    const data = new FormData(e.target);

    //mandar al api
    get_product(data.get("search")).then(prod=>{
        //contenedor de formulario
        const box = Box();

        //formulario de producto
        const form = Form();

        //campos de producto
        const lblName = Label("name","Nombre del producto:");
        const fldName = Input("name","text");
        fldName.maxLength = 30;
        fldName.value = prod.name;
        const lblUnits = Label("units","Unidades disponibles:");
        const fldUnits = Input("units","number");
        fldUnits.min = 1;
        fldUnits.max = 100;
        fldUnits.value = prod.units;
        const lblPrice = Label("price","Precio unitario:");
        const fldPrice = Input("price","number");
        fldPrice.min = 1;
        fldPrice.value = prod.price;
        const lblDesc = Label("desc","Descripcion:");
        const fldDesc = TextArea("desc");
        fldDesc.value = prod.desc;

        //boton de submit
        const btn = Button("actualizar","agree",true);

        //añadir todo al formulario
        form.appendChild(lblName);
        form.appendChild(fldName);
        form.appendChild(lblUnits);
        form.appendChild(fldUnits);
        form.appendChild(lblPrice);
        form.appendChild(fldPrice);
        form.appendChild(lblDesc);
        form.appendChild(fldDesc);
        form.appendChild(btn);

        //escucha para manejar el envio
        form.addEventListener("submit",(e) => {
            //prevenir recargo
            e.preventDefault();

            //recuperar el id de cliente
            const user = JSON.parse(sessionStorage.getItem("session"));

            //obtener datos del formulario
            const dataU = new FormData(e.target);
            dataU.append("seller",user.id);

            //manejar el update
            handleUpdate(dataU);
        });

        //añadir a la caja
        box.appendChild(form);

        //añadir a la seccion
        product_cont.appendChild(box);
    }).catch(err=>console.error(err));
}

//agregar escucha
search_form.addEventListener("submit",e =>{ handleSearch(e) });