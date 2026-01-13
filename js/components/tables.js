export function Table(id){
    //crear el elemento
    const table = document.createElement("table");

    //configurar elemento
    table.id = id
    table.className = "tbl";


    //retornar el elemento
    return table;
}

export function TableRow(){
    //crear elemento
    const row = document.createElement("tr");

    //retornar el elemento
    return row;
}

export function TableCell(value, type = "common"){
    let cell = null;
    //crear el elemento
    if(type == "common"){
        cell = document.createElement("td");
    }else{
        cell = document.createElement("th");
    }

    //configurar el elemento
    if(type == "common"){
        cell.className = "tbl-cell"
    }else{
        cell.className = "tbl-head";
    }
    cell.innerText = value

    //retornar el elemento
    return cell;
}