import { ADMIN, SELLER } from '../../utils/enums.js';

//obtener la caja
const user_box = document.getElementById("user-box");

//recuperar datos de usuario
const user = JSON.parse(sessionStorage.getItem("session"));

//ponemos los datos del usuario
user_box.innerHTML = 
"<h1 class=\"centered-text\">Datos de la cuenta</h1>"+
"<p>"+
"<b>ID: </b>"+user.id+"<br>"+
"<b>Nombre de usuario: </b>"+user.name+"<br>"+
"<b>correo vinculado: </b>"+user.mail+"<br>"+
"<b>Rol: </b>"+user.role+"<br>"
+"</p>";

//redireccion dinamica
switch(user.role){
    case ADMIN:
        user_box.innerHTML += "<a class=\"link\" href=\"/html/adminPages/dash.html\">volver a home</a>";
        break;
    case SELLER:
        user_box.innerHTML += "<a class=\"link\" href=\"/html/sellerPages/home.html\">volver a home</a>";
        break;
    default:
        user_box.innerHTML += "<a class=\"link\" href=\"/html/clientPages/home.html\">volver a home</a>";
        break;
}
