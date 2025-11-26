export function ProductBox(product){
    //crear la caja de contenedor
    const caja = document.createElement("div");
    caja.style.width = "60%";
    caja.classList = "chart";

    //contenido de la caja
    const p = document.createElement("p");
    p.innerHTML = `
        <b>id:</b> ${product.id}<br>
        <b>nombre:</b> ${product.name}<br>
        <b>unidades:</b> ${product.units}<br>
    `
    const a = document.createElement("a");
    a.href = "/html/sellerPages/home.html";
    a.className = "link centered-text";
    a.innerText = "ver mas.";

    //añadir a la caja
    caja.appendChild(p);
    caja.appendChild(a);

    //retornar la caja
    return caja;
}