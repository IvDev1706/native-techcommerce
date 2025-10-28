//verificar si existe la cookie
if(!sessionStorage.getItem("session")){
    window.open("/techcommerce/index.html","_self");
}