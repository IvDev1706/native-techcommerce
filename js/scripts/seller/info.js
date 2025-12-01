import { get_product } from '../../services/product_service.js';
import { ProductBox } from '../../components/boxes.js';

//contenedor de producto
const product_cont = document.getElementById("product-cont");

//limpiar el contenedor
while(product_cont.firstChild){
    //eliminar primer hijo
    product_cont.removeChild(product_cont.firstChild);
}

//api de parametros
const id = new URLSearchParams(location.search).get("id")

//verficar url
if(id){
    //si la url existe se pide la informacion al api
    get_product(id).then((prod)=>{
        //añadir la caja de informacion
        product_cont.appendChild(ProductBox(prod));
    }).catch(err=>console.log(err));
}else{
    product_cont.innerText = "direccion invalida, no se puede visualizar un producto";
}
