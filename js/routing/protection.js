//verificar si existe la cookie
if(!sessionStorage.getItem("session")){
    window.open("/index.html","_self");
}