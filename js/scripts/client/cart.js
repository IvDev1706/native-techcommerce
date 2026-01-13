import { register_order } from '../../services/order_service.js';
import { discount_units } from '../../services/product_service.js';
import { Table, TableRow, TableCell } from '../../components/tables.js';
import Button from '../../components/buttons.js';

//obtener el contenedor
const cart_cont = document.getElementById("cart-cont");

//******* funciones *******//
//manejo de limpieza de carrito
const cleanCart = () => {
    //limpiar el sessionStorage
    sessionStorage.setItem("cart","[]");

    //limpiar el contenedor
    clear_element(cart_cont);

    //mostrar texto
    display_elements();
}

const removeProduct = (id) => {
    //obtener del sessionStorage el carrito
    let cart = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : []

    //eliminar elemento
    let newCart = cart.filter( p => p.id != id);

    //guardar en el sessionstorage
    sessionStorage.setItem("cart",JSON.stringify(newCart));

    //limpiar el contenedor
    clear_element(cart_cont);

    //mostrar texto
    display_elements();
}

const buyCart = () => {
    //obtener el usuario
    const user = JSON.parse(sessionStorage.getItem("session"));

    //obtener del sessionStorage el carrito
    let cart = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : []

    //calcular el total de venta
    let total = 0;
    for (const product of cart) {
        //sumar el total
        total += product.price;
    }


    //preparar el objeto de orden
    const order = {
        date: (new Date()).toISOString().split('T')[0],
        status: "pedido",
        amount: total,
        user: parseInt(user.id),
        products: cart
    }

    console.log(order);

    //mandar al api
    register_order(order).then(resO => {
        //verificar respuesta
        if(resO){
            discount_units(order.products).then(resD => {
                if(resD){
                    //mensaje de exito
                    alert("compra realizada!!!");
                    //limpiar carrito
                    cleanCart();
                }
            }).catch(errD => console.log(errD));
        }else{
            //mensaje de fracaso
            alert("error al realizar compra!!!");
        }
    }).catch(errO => console.log(errO));
}

function clear_element(element){
    //limpiar contenedor
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function display_elements(){
    //obtener del sessionStorage el carrito
    let cart = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : []

    //verificar productos
    if(!cart.length){
        cart_cont.innerHTML = '<p class="centered-text">no hay productos en el carrito aun</p>';
    }else{
        //limpiar la tabla
        clear_element(table);

        //poner los headers
        const headers = TableRow();
        for (const header of ["id","nombre","unidades","precio","accion"]) {
            headers.appendChild(TableCell(header,"header"));
        }
        table.appendChild(headers);

        //insertar productos
        let row = null;
        let dropBtn = null;
        let buttonCell = null;
        let total = 0;
        for (const product of cart) {
            //crear el row
            row = TableRow();

            //añadir los cells
            row.appendChild(TableCell(product.id));
            row.appendChild(TableCell(product.name));
            row.appendChild(TableCell(product.units));
            row.appendChild(TableCell(product.price));

            //sumar el total
            total += product.price;

            //boton de eliminado
            dropBtn = Button("eliminar","danger");
            dropBtn.addEventListener("click",e=>{
                removeProduct(product.id);
            });
            buttonCell = TableCell("");
            buttonCell.appendChild(dropBtn);
            row.appendChild(buttonCell);

            //añadir a la tabla
            table.appendChild(row);
        }

        //mostrar el total de compra
        total_text.innerText = "total de la compra: $"+total+" mxn";

        //añadir la tabla
        cart_cont.appendChild(table);
        //añadir texto de total
        cart_cont.appendChild(total_text);
        //añadir botones
        cart_cont.appendChild(btnBox);
    }
}

//******* elementos que se van a insertar *******//
const table = Table("cart-table");
const btnClean = Button("limpiar");
btnClean.addEventListener("click",() => {
    cleanCart();
});
const btnBuy = Button("comprar","agree");
btnBuy.addEventListener("click",() => {
    buyCart();
});
const btnBox = document.createElement("div");
btnBox.className = "row-layout-spaced";
btnBox.style.width = "100%";
btnBox.appendChild(btnBuy);
btnBox.appendChild(btnClean);
const total_text = document.createElement("p");
total_text.className = "centered-text";

//limpiar contenedor
clear_element(cart_cont);
display_elements();