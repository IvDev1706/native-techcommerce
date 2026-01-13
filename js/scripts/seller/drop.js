import { delete_product, get_product } from '../../services/product_service.js';
import { ProductBox } from '../../components/boxes.js';
import Button from '../../components/buttons.js';

//contenedor de producto
const product_cont = document.getElementById("product-cont");
//formulario de busqueda
const search_form = document.getElementById("search-form");

//manejar la eliminacion del producto
function handleDrop(id){
    //mandar al api
    delete_product(id).then(res=>{
        //verificar respuesta
        if(res){
            //mensaje de exito
            alert("producto eliminado!!!")
            //redireccion
            window.open("/html/sellerPages/home.html","_self");
        }else{
            //mensaje de error
            alert("Error al eliminar producto");
        }
    }).catch(err=>console.error(err));
}


//manejar el envio del formulario
function handleSubmit(e){
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
        //boton de eliminado
        const dropBtn = Button("eliminar","danger");
        dropBtn.addEventListener("click",e=>handleDrop(prod.id));
        //añadir la caja de informacion
        const pbox = ProductBox(prod,"vendedor");
        pbox.childNodes.item(1).appendChild(dropBtn);
        product_cont.appendChild(pbox);

    }).catch(err=>console.error(err));
}

//agregar escucha
search_form.addEventListener("submit",e =>{ handleSubmit(e) });

