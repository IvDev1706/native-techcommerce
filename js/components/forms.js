export function Form(){
    //crear elemento formulario
    const form = document.createElement("form");

    //configurar el formulario
    form.id = "produc-form";
    form.className = "column-layout";
    form.method = "post";

    //retornar el elemento
    return form;
}

export function Input(name, type){
    //crear el inout
    const input = document.createElement("input");

    //configuracion del input
    input.name = name;
    input.type = type;
    input.required = true;

    //retornar elemento
    return input;
}

export function TextArea(name){
    //crear el elemento
    const text = document.createElement("textarea");

    //configuracion
    text.name = name;
    text.required = true;

    //retornar elemento
    return text;
}

export function Label(link, text){
    //crear el elemento
    const lbl = document.createElement("label");

    //configuracion
    lbl.htmlFor = link;
    lbl.innerText = text;

    //retornar el elemento
    return lbl;
}