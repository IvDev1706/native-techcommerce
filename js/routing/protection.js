import { ADMIN, SELLER, CLIENT } from '../utils/enums.js'

//verificar si existe el sessionstorage
if(!sessionStorage.getItem("session")){
    window.open("/index.html","_self");
}

//recuperar datos de sesion
const user = JSON.parse(sessionStorage.getItem("session"));

//verificar permiso y ruta
if(!location.pathname.includes("public") && (user.role == ADMIN && !location.pathname.includes("adminPages") || user.role == SELLER && !location.pathname.includes("sellerPages") || user.role == CLIENT && !location.pathname.includes("clientPages"))){
    //redirigir a pagina de no permitido
    window.open("/html/public/unauthorized.html","_self");
}
