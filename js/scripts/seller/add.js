import { register_product } from "../../services/product_service.js";

//seleccionar formulario
const product_form = document.getElementById("product-form");

//manejo de envio
function handleSubmit(e){
    //prevenir recargo
    e.preventDefault();

    //obtener los datos
    const user = JSON.parse(sessionStorage.getItem("session"));
    const data = new FormData(e.target);
    data.append("seller",user.id);

    //mandar al api
    register_product(data).then((res)=>{
        //verificar resultado
        if(res){
            //mensaje de exito
            alert("Producto registrado!!!");
            //redirigir a productos
            window.open("/html/sellerPages/home.html","_self");
        }else{
            //mensaje de fracaso
            alert("Error al registrar producto");
        }
    }).catch(err=>console.log(err));
}

//vincular la escucha
product_form.addEventListener("submit",e => handleSubmit(e));