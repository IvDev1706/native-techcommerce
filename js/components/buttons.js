export default function Button(text, type = "primary", submit = false){
    //elemento de boton
    const button = document.createElement("button");
    button.className = "btn btn-"+type;
    button.textContent = text;
    button.type = submit ? "submit" : "button";

    //retornar el boton
    return button;
}