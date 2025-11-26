import { get_products } from "../../services/product_service.js";
import { ProductBox } from '../../components/boxes.js'

//obtener el contenedor
const product_cont = document.getElementById("product-cont");

//fragmento de de productos
const frag = document.createDocumentFragment();

//limpiar contenedor
while(product_cont.firstChild){
    //eliminar hijos
    product_cont.removeChild(product_cont.firstChild);
}

//pedir productos
const user = JSON.parse(sessionStorage.getItem("session"));
get_products(0,user.id).then((products)=>{
    //guardar productos en el fragmento
    for (const prod of products) {
        //crear caja y agregar al fragmento
        frag.appendChild(ProductBox(prod))
    }

    //añadir el fragmento al elemento
    product_cont.appendChild(frag);
}).catch(err=>console.error(err));
