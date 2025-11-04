import { searchBar } from "../components/searchbar.js";

//dataset de prueba
const products = [
    {
        "id":1,
        "name":"Mouse RGB",
        "units":10,
        "price":80
    },
    {
        "id":2,
        "name":"ESP32 S3",
        "units":5,
        "price":230
    },
    {
        "id":3,
        "name":"SSD 1TB",
        "units":8,
        "price":500
    }
]

//control de pestaña
var current_tab = "";

//obtener el contenedor
const target = document.getElementById("target-cont");

//obtener los botones
const btn_read = document.getElementById("btn-read");
const btn_add = document.getElementById("btn-add");
const btn_modify = document.getElementById("btn-modify");
const btn_drop = document.getElementById("btn-drop");

//limpiar el target
function clear(){
    //eliminar cada nodo
    while(target.firstChild){
        target.removeChild(target.firstChild);
    }
}

//funciones de vista
function read(){
    //vista principal de productos
    const salida = document.createDocumentFragment();

    //titulo
    const title = document.createElement("h1");
    title.className = "centered-text";
    title.innerText = "Listado de productos";
    salida.appendChild(title);

    //cajas d eproducto
    let caja = null;
    let p = null;
    for (const product of products) {
        //preparar el contenedor
        caja = document.createElement("div");
        caja.style.width = "60%";
        caja.className = "chart";
        //añadir el contenido a la caja
        p = document.createElement("p");
        p.innerHTML = `
        <b>ID:</b> ${product.id}<br>
        <b>Nombre:</b> ${product.name}<br>
        <b>Unidades disponibles:</b> ${product.units} <br>
        <b>Precio:</b> ${product.price}<br>
        `;
        //añadir la caja a la salida
        caja.appendChild(p)
        salida.appendChild(caja);
    }

    //añadir el fragmento
    target.appendChild(salida);
}

function add(){
    //formulario para crear un producto
    let salida = document.createDocumentFragment();

    //titulo de la vista
    const title = document.createElement("h1");
    title.className = "centered-text";
    title.innerText = "Ingresar nuevo producto";
    salida.appendChild(title);

    //caja de contenido
    const caja = document.createElement("div");
    caja.className = "chart";
    caja.style.width = "60%";

    //formulario de creacion
    const form = document.createElement("form");
    form.className = "column-layout";
    form.setAttribute("method","post");

    //etiquetas
    const lbl_nombre = document.createElement("label");
    lbl_nombre.htmlFor = "name";
    lbl_nombre.innerText = "Nombre del producto:";
    const lbl_unds = document.createElement("label");
    lbl_unds.htmlFor = "units";
    lbl_unds.innerText = "Unidades disponibles:";
    const lbl_prec = document.createElement("label");
    lbl_prec.htmlFor = "price";
    lbl_prec.innerText = "Precio unitario:";
    const lbl_desc = document.createElement("label");
    lbl_desc.htmlFor = "desc";
    lbl_desc.innerText = "Descripcion del producto:";

    //campos del formulario
    const fld_nombre = document.createElement("input");
    fld_nombre.type = "text";
    fld_nombre.className = "inpt";
    fld_nombre.name = "name";
    fld_nombre.maxLength = 30;
    fld_nombre.required = true;
    const fld_unds = document.createElement("input");
    fld_unds.type = "number";
    fld_unds.className = "inpt";
    fld_unds.name = "units";
    fld_unds.min = 1;
    fld_unds.required = true;
    const fld_prec = document.createElement("input");
    fld_prec.type = "number";
    fld_prec.className = "inpt";
    fld_prec.name = "price";
    fld_prec.required = true;
    const fld_desc = document.createElement("textarea");
    fld_desc.name = "desc";
    const btn_enviar = document.createElement("button");
    btn_enviar.type = "submit";
    btn_enviar.className = "btn btn-agree";
    btn_enviar.innerText = "registrar";

    //añadir campos
    form.appendChild(lbl_nombre);
    form.appendChild(fld_nombre);
    form.appendChild(lbl_unds);
    form.appendChild(fld_unds);
    form.appendChild(lbl_prec);
    form.appendChild(fld_prec);
    form.appendChild(lbl_desc);
    form.appendChild(fld_desc);
    form.appendChild(btn_enviar);

    //añadir todo a la caja
    caja.appendChild(form);

    //añadir al fragemento
    salida.appendChild(caja);

    //añadir al target
    target.append(salida);
}

function modify(){
    //formulario para crear un producto
    let salida = document.createDocumentFragment();

    //titulo de la vista
    const title = document.createElement("h1");
    title.className = "centered-text";
    title.innerText = "Modificar informacion de producto";
    salida.appendChild(title);

    //caja de contenido
    const caja = document.createElement("div");
    caja.className = "chart";
    caja.style.width = "60%";

    //formulario de creacion
    const form = document.createElement("form");
    form.className = "column-layout";
    form.setAttribute("method","post");

    //etiquetas
    const lbl_nombre = document.createElement("label");
    lbl_nombre.htmlFor = "name";
    lbl_nombre.innerText = "Nombre del producto:";
    const lbl_unds = document.createElement("label");
    lbl_unds.htmlFor = "units";
    lbl_unds.innerText = "Unidades disponibles:";
    const lbl_prec = document.createElement("label");
    lbl_prec.htmlFor = "price";
    lbl_prec.innerText = "Precio unitario:";
    const lbl_desc = document.createElement("label");
    lbl_desc.htmlFor = "desc";
    lbl_desc.innerText = "Descripcion del producto:";

    //campos del formulario
    const fld_nombre = document.createElement("input");
    fld_nombre.type = "text";
    fld_nombre.className = "inpt";
    fld_nombre.name = "name";
    fld_nombre.maxLength = 30;
    fld_nombre.required = true;
    const fld_unds = document.createElement("input");
    fld_unds.type = "number";
    fld_unds.className = "inpt";
    fld_unds.name = "units";
    fld_unds.min = 1;
    fld_unds.required = true;
    const fld_prec = document.createElement("input");
    fld_prec.type = "number";
    fld_prec.className = "inpt";
    fld_prec.name = "price";
    fld_prec.required = true;
    const fld_desc = document.createElement("textarea");
    fld_desc.name = "desc";
    const btn_enviar = document.createElement("button");
    btn_enviar.type = "submit";
    btn_enviar.className = "btn btn-primary";
    btn_enviar.innerText = "modificar";

    //añadir campos
    form.appendChild(lbl_nombre);
    form.appendChild(fld_nombre);
    form.appendChild(lbl_unds);
    form.appendChild(fld_unds);
    form.appendChild(lbl_prec);
    form.appendChild(fld_prec);
    form.appendChild(lbl_desc);
    form.appendChild(fld_desc);
    form.appendChild(btn_enviar);

    //añadir todo a la caja
    caja.appendChild(form);

    //añadir al fragemento
    salida.appendChild(caja);

    //añadir al target
    target.append(salida);
}

function drop(){
    //formulario para crear un producto
    let salida = document.createDocumentFragment();

    //titulo de la vista
    const title = document.createElement("h1");
    title.className = "centered-text";
    title.innerText = "Eliminar producto existente";
    salida.appendChild(title);

    //caja de contenido
    const caja = document.createElement("div");
    caja.className = "chart";
    caja.style.width = "60%";

    //formulario de creacion
    const form = searchBar();

    //añadir todo a la caja
    caja.appendChild(form);

    //añadir al fragemento
    salida.appendChild(caja);

    //añadir al target
    target.append(salida);
}

//ecuchas de botones
btn_read.addEventListener("click",(e)=> {
    if(current_tab!="read"){
        clear();//limpia el target
        read();//pone vista
        current_tab = "read";
    }
});

btn_add.addEventListener("click",(e)=> {
    if(current_tab!="add"){
        clear();//limpia el target
        add();//pone vista
        current_tab = "add";
    }
});

btn_modify.addEventListener("click",(e)=>{
    if(current_tab!="modify"){
        clear();//limpia el target
        modify();//pone vista
        current_tab="modify";
    }
});

btn_drop.addEventListener("click",(e)=>{
    if(current_tab!="drop"){
        clear();//limpia el target
        drop();//pone vista
        current_tab="drop";
    }
});