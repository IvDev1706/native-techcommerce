import { Table, TableRow, TableCell } from '../../components/tables.js';
import { get_order_products } from '../../services/order_service.js';

//obtener el contenedor
const history_cont = document.getElementById("history-cont");

//tabla de destino
const table = Table("cart-table");

//limpiar contenedor
while(history_cont.firstChild){
    history_cont.removeChild(history_cont.firstChild);
}

//obtener el id
const id = new URLSearchParams(location.search).get("id");

//pedir historial al api
get_order_products(id).then(prods => {
    //poner los headers
    const headers = TableRow();
    for (const header of ["id","nombre","unidades","monto"]) {
        headers.appendChild(TableCell(header,"header"));
    }
    table.appendChild(headers);

    //poner cada orden
    let row = null;
    let link = null;
    for (const prod of prods) {
        //crear el row
        row = TableRow();

        //añadir los cells
        row.appendChild(TableCell(prod.id));
        row.appendChild(TableCell(prod.name));
        row.appendChild(TableCell(prod.units));
        row.appendChild(TableCell(prod.price*prod.units));

        //añadir a la tabla
        table.appendChild(row);
    }

    //añadir la tabla
    history_cont.appendChild(table);
}).catch(err => console.log(err));