export function searchBar(){
    //crear un fragmento
    const frag = document.createDocumentFragment();

    //formulario
    const form = document.createElement("form");
    form.method = "post";
    form.className = "row-layout";

    //campos y etiqueta
    const fld_search = document.createElement("input");
    fld_search.required = true;
    fld_search.className = "inpt";
    fld_search.name = "search";
    fld_search.style.flexGrow = "1";
    fld_search.style.flexShrink = "0";
    const btn_search = document.createElement("button");
    btn_search.innerHTML = "buscar";
    btn_search.type = "submit";
    btn_search.className = "btn btn-primary";

    //añadir al formulario
    form.appendChild(fld_search);
    form.appendChild(btn_search);

    //añadir al fragmento
    frag.appendChild(form);

    return frag;
}