import { get_product } from '../../services/product_service.js';
import { ProductBox } from '../../components/boxes.js';
import { Label, Input } from '../../components/forms.js';
import Button from '../../components/buttons.js';

//contenedor de producto
const product_cont = document.getElementById("product-cont");

//limpiar el contenedor
while(product_cont.firstChild){
    //eliminar primer hijo
    product_cont.removeChild(product_cont.firstChild);
}

//manejo de adicion al carrito
const addToCart = (prd) => {
    //verificar el carrito
    if(!sessionStorage.getItem("cart")){
        sessionStorage.setItem("cart","[]");
    }

    //obtener el carrito
    const cart = JSON.parse(sessionStorage.getItem("cart"));

    //verificar si es que no esta ya
    const prev = cart.find(p => p.id == prd.id);
    if(prev){
        //obtener precio unitario
        let perU = Math.round(prev.price / prev.units);
        //actualizar unidades
        prev.units += prd.units;
        //actualizar precio
        prev.price = perU * prev.units;
    }else{
        //añadir
        cart.push(prd);
    }

    //volver a guardar en el sessionstorage
    sessionStorage.setItem("cart",JSON.stringify(cart));
}

//api de parametros
const id = new URLSearchParams(location.search).get("id");

//verficar url
if(id){
    //si la url existe se pide la informacion al api
    get_product(id).then((prod)=>{
        //elementos de contador
        const lblCont = Label("units","Comprar:");
        const fldCont = Input("units","number");
        fldCont.id = "units";
        fldCont.min = 1;
        fldCont.max = prod.units;
        fldCont.value = 1;
        //boton de añadir
        const btnAdd = Button("añadir al carrito");
        btnAdd.addEventListener("click",e=>{
            addToCart({id: prod.id, name: prod.name, units: parseInt(fldCont.value), price: fldCont.value*prod.price});
            alert("producto añadido al carrito!!!");
        });
        //añadir la caja de informacion
        const pbox = ProductBox(prod,"cliente");
        pbox.childNodes.item(1).appendChild(lblCont);
        pbox.childNodes.item(1).appendChild(fldCont);
        pbox.childNodes.item(1).appendChild(btnAdd);
        //añadir la caja
        product_cont.appendChild(pbox);
    }).catch(err=>console.log(err));
}else{
    product_cont.innerText = "direccion invalida, no se puede visualizar un producto";
}
