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
    const caja = Box();

    //datos del producto si o si
    const product_name = document.createElement("h3");
    product_name.innerText = product.name;
    const product_units = document.createElement("p");
    product_units.className = "italic";
    product_units.innerText = product.units + " unidades disponibles";

    //añadir a la caja
    caja.appendChild(product_name);
    caja.appendChild(product_units);

    if(!product.desc){
        //enlace a mas detalles
        const product_detail = document.createElement("a");
        product_detail.href = "/html/sellerPages/detail.html?id="+product.id;
        product_detail.className = "link centered-text";
        product_detail.innerText = "ver mas.";

        //añadir a la caja
        caja.appendChild(product_detail);
    }else{
        //modo detallado
        const product_price = document.createElement("p");
        product_price.innerHTML = "<b>Precio unitario:</b> $"+product.price+"mxn";
        const product_desc = document.createElement("p");
        product_desc.className = "justified";
        product_desc.innerText = product.desc;

        //añadir a la caja
        caja.appendChild(product_price);
        caja.appendChild(product_desc);
    }

    //retornar la caja
    return caja;
}