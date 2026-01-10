import { ADMIN, SELLER } from '../../utils/enums.js';

//obtener la caja
const content_box = document.getElementById("content-box");

//recuperar datos de usuario
const user = JSON.parse(sessionStorage.getItem("session"));

//redireccion dinamica
switch(user.role){
    case ADMIN:
        content_box.innerHTML += "<a class=\"link\" href=\"/html/adminPages/dash.html\">volver a home</a>";
        break;
    case SELLER:
        content_box.innerHTML += "<a class=\"link\" href=\"/html/sellerPages/home.html\">volver a home</a>";
        break;
    default:
        content_box.innerHTML += "<a class=\"link\" href=\"/html/clientPages/home.html\">volver a home</a>";
        break;
}