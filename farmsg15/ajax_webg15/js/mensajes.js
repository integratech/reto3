let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let tabla = document.getElementById("tabla");

traerdatos()

function inicial() {
    nuevo.style.display = "none"
    modificar.style.display = "none"
    borrar.style.display = "none"
    datos.style.display = "block"
}

function agregar() {
    nuevo.style.display = "block"
    modificar.style.display = "none"
    borrar.style.display = "none"
    datos.style.display = "none"
}



function editar(id) {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            //Asigna la informaciòn obtenida tras la invocaciòn del ws a cada uno de los campos del formulario
            idModif = document.getElementById("idModif")
            messagetextModif = document.getElementById("messagetextModif")
            
            idModif.value = respuesta.items[0].id
            messagetextModif.value = respuesta.items[0].messagetext
            
            document.getElementById("idLabel").innerHTML = "<strong>Id: </strong>" + idModif.value
            //Configura aspecto visual de la interfaz
            nuevo.style.display = "none"
            modificar.style.display = "block"
            borrar.style.display = "none"
            datos.style.display = "none"
        }
    };
    xhttp.open(
        "GET",
        "https://g204ecfa60e021a-g3qlhq6a8n5r6dq0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message/" + id,
        true
    );
    xhttp.send();
}

function eliminar(id) {
    let url = "https://g204ecfa60e021a-g3qlhq6a8n5r6dq0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message"

    //Creo un objeto para poder procesar la peticion ajax
    let solicitud = new XMLHttpRequest()

    solicitud.open("GET", url + "/" + id, true)
    solicitud.send();

    solicitud.onreadystatechange = function () {
        //si la respusta esta lista y no hubo error
        if (solicitud.readyState == 4 && solicitud.status == 200) {

            let respuesta = JSON.parse(solicitud.responseText)

            document.getElementById("idList").innerHTML = "<strong>Id: </strong>" + respuesta.items[0].id
            document.getElementById("messagetextList").innerHTML = "<strong>Messagetext: </strong>" + respuesta.items[0].messagetext
            document.getElementById("idDelete").value = respuesta.items[0].id


            nuevo.style.display = "none"
            modificar.style.display = "none"
            borrar.style.display = "block"
            datos.style.display = "none"
        }
    }

}

function guardarNuevo() {
    //recupera información del formulario
    let id = document.getElementById("id").value
    let messagetext = document.getElementById("messagetext").value

    //creo un objeto javascript
    
    let objeto = {
        id: id,
        messagetext: messagetext
    };
    
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)

    let url =
        "https://g204ecfa60e021a-g3qlhq6a8n5r6dq0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()

    /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
    peticion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

        //Configura el aspecto de la pagina
        traerdatos()
        inicial()
        }
    }

    peticion.open("POST", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
}

function guardarEditar() {
    let url =
        "https://g204ecfa60e021a-g3qlhq6a8n5r6dq0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

    //recupera la informacion de los campos de texto "input"
    idModif = document.getElementById("idModif").value
    messagetextModif = document.getElementById("messagetextModif").value

    //crear un objeto javascript
    let objeto = {
        id: idModif,
        messagetext: messagetextModif
    };

    //Crea un objeto de tipo JSON a partir de un objeto javascript
    let objetoJSON = JSON.stringify(objeto)
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()

    /*2 propiedad onreadystatechange asigna a una funcion
    que funcion valida si la respuesta fue exitosa
    readyState=4 y status=201, en cuyo caso obtiene la respuesta, 
    le aplica formato y modifica la pagina o vista
   */
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 201) {
            traerdatos()
            inicial()
        }
    }

    //Configura la peticion
    peticion.open("PUT", url, true)
    //Indico que la peticion recibe formato JSON
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    //Hago un llamado o invoco la peticion
    peticion.send(objetoJSON)
}

function guardarBorrar() {
    let url = "https://g204ecfa60e021a-g3qlhq6a8n5r6dq0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message"

    let objetoPeticion = new XMLHttpRequest();
    let id = document.getElementById("idDelete").value

    //objeto javascript
    let parametro = {
        id: id
    }

    //Crea un objeto de tipo JSON a partir de un objeto javascript
    let objetoJSON = JSON.stringify(parametro)

    objetoPeticion.open("DELETE", url, true)
    objetoPeticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    objetoPeticion.send(objetoJSON)

    objetoPeticion.onreadystatechange = function () {
        if (objetoPeticion.readyState == 4 && objetoPeticion.status == 204) {
            traerdatos()
            inicial()
        }
    }
}

function traerdatos() {
    let registros = ""
    let id = ""

    let xhttp = new XMLHttpRequest();
    let salida = "<strong>Texto del mensaje :</strong>";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            for (let i in respuesta.items) {
                id = respuesta.items[i].id
                registros += "<tr>\
                        <th scope=\"row\">" + respuesta.items[i].id + "</th>\
                        <td>" + respuesta.items[i].messagetext + "</td>\
                        <td>\
                             <button class=\"btn btn-outline-dark\" onclick=\"editar(" + id + ")\">Modificar Mensaje</button>\
                            <button class=\"btn btn-outline-dark\" onclick=\"eliminar(" + id + ")\">Borrar Mensaje</button>\
                        </td>\
                        </tr>"

            }

            document.getElementById("registros").innerHTML = registros;

            inicial()
        }
    };
    xhttp.open(
        "GET",
        "https://g204ecfa60e021a-g3qlhq6a8n5r6dq0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
        true
    );
    xhttp.send();
}