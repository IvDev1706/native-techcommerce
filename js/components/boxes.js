export function Box(){
    //crear caja div
    const caja = document.createElement("div");
    caja.style.width = "60%";
    caja.classList = "chart";

    //retornar la caja div
    return caja;
}

export function ProductBox(product){
    //crear la caja de contenedor
    const content_box = Box();
    content_box.className += " row-layout";

    //imagen de producto
    const pic = document.createElement("img");
    pic.src = "../../assets/img/product-ico.png";
    pic.width = 256;

    //contenedor de info de producto
    const info_box = document.createElement("div");
    info_box.style.padding = "5px";

    //datos del producto si o si
    const product_name = document.createElement("h3");
    product_name.innerText = product.name;
    const product_units = document.createElement("p");
    product_units.className = "italic";
    product_units.innerText = product.units + " unidades disponibles";

    //añadir a la caja
    info_box.appendChild(product_name);
    info_box.appendChild(product_units);

    if(!product.desc){
        //enlace a mas detalles
        const product_detail = document.createElement("a");
        product_detail.href = "/html/sellerPages/detail.html?id="+product.id;
        product_detail.className = "link centered-text";
        product_detail.innerText = "ver mas.";

        //añadir a la caja
        info_box.appendChild(product_detail);
    }else{
        //modo detallado
        const product_price = document.createElement("p");
        product_price.innerHTML = "<b>Precio unitario:</b> $"+product.price+" mxn";
        const product_desc = document.createElement("p");
        product_desc.className = "justified";
        product_desc.innerText = product.desc;

        //añadir a la caja
        info_box.appendChild(product_price);
        info_box.appendChild(product_desc);
    }

    //añadir a la caja
    content_box.appendChild(pic);
    content_box.appendChild(info_box);

    //retornar la caja
    return content_box;
}

export function UserBox(user){
    //crear la caja de contenedor
    const content_box = Box();
    content_box.className += " row-layout";

    //imagen de producto
    const pic = document.createElement("img");
    pic.src = "../../assets/img/user-ico.png";
    pic.width = 168;

    //contenedor de info de producto
    const info_box = document.createElement("div");
    info_box.style.padding = "5px";

    //datos del usuario si o si
    const user_name = document.createElement("h3");
    user_name.innerText = user.name;
    const user_id = document.createElement("p");
    user_id.innerHTML = "<b>ID:</b> "+user.id;
    const user_mail = document.createElement("p");
    user_mail.innerHTML = "<b>correo:</b> "+user.mail;

    //añadir a la caja
    info_box.appendChild(user_name);
    info_box.appendChild(user_id);
    info_box.appendChild(user_mail);

    if(!user.role){
        //enlace a mas detalles
        const user_detail = document.createElement("a");
        user_detail.href = "/html/adminPages/detail.html?id="+user.id;
        user_detail.className = "link centered-text";
        user_detail.innerText = "ver mas.";

        //añadir a la caja
        info_box.appendChild(user_detail);
    }else{
        //modo detallado
        const user_role = document.createElement("p");
        user_role.innerHTML = "<b>Rol:</b> "+user.role;

        //añadir a la caja
        info_box.appendChild(user_role);
    }

    //añadir a la caja
    content_box.appendChild(pic);
    content_box.appendChild(info_box);

    //retornar la caja
    return content_box;
}