import { Table, TableRow, TableCell } from '../../components/tables.js';
import { get_orders } from '../../services/order_service.js';

//obtener usuario
const user = JSON.parse(sessionStorage.getItem("session"));

//obtener el contenedor
const history_cont = document.getElementById("history-cont");

//tabla de destino
const table = Table("cart-table");

//limpiar contenedor
while(history_cont.firstChild){
    history_cont.removeChild(history_cont.firstChild);
}

//pedir historial al api
get_orders(0,user.id).then(ords => {
    //poner los headers
    const headers = TableRow();
    for (const header of ["id","fecha","estatus","monto","detalle"]) {
        headers.appendChild(TableCell(header,"header"));
    }
    table.appendChild(headers);

    //poner cada orden
    let row = null;
    let link = null;
    let cell = null;
    for (const ord of ords) {
        //crear el row
        row = TableRow();

        //añadir los cells
        row.appendChild(TableCell(ord.id));
        row.appendChild(TableCell(ord.date));
        row.appendChild(TableCell(ord.status));
        row.appendChild(TableCell(ord.amount));

        //enlace de detalle
        link = document.createElement("a");
        link.className = "link";
        link.href = "/html/clientPages/historydetail.html?id="+ord.id;
        link.innerText = "ver productos";
        cell = TableCell("");
        cell.appendChild(link);
        row.append(cell);

        //añadir a la tabla
        table.appendChild(row);
    }

    //añadir la tabla
    history_cont.appendChild(table);
}).catch(err => console.log(err));
