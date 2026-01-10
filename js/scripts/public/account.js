import { ADMIN, SELLER } from '../../utils/enums.js';

//obtener la caja
const user_box = document.getElementById("user-box");

//recuperar datos de usuario
const user = JSON.parse(sessionStorage.getItem("session"));

//elementos
const info_box = document.createElement("div");
const pic = document.createElement("img");
const title = document.createElement("h1");
const info_p = document.createElement("p");
const link = document.createElement("a");

//ponemos los datos del usuario
pic.src = "../../assets/img/user-ico.png";
pic.width = "256";
info_box.className = "column-layout";
title.className = "centered-text"
title.innerHTML = "Datos de la cuenta";
info_p.innerHTML = 
`<b>ID: </b>${user.id}<br>
<b>Nombre de usuario: </b>${user.name}<br>
<b>correo vinculado: </b>${user.mail}<br>
<b>Rol: </b>${user.role}<br>`;
link.className = "link";
link.innerText = "volver a home";

//redireccion dinamica
switch(user.role){
    case ADMIN:
        link.href = "/html/adminPages/dash.html";
        break;
    case SELLER:
        link.href = "/html/sellerPages/home.html";
        break;
    default:
        link.href = "/html/clientPages/home.html";
        break;
}

//añadir al div
info_box.appendChild(title);
info_box.appendChild(info_p);
info_box.appendChild(link);

//añadir a la caja
user_box.appendChild(pic);
user_box.appendChild(info_box);