

class Persona
{
    id = 0;
    nombre = "";
    apellido = "";
    edad = 0;
    constructor(id,nombre,apellido,edad)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    toString()
    {
        let mostrar = "nombre :" + this.nombre + " apellido :" + this.apellido + " edad : " + this.edad;
        return mostrar;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}


class Empleado extends Persona
{
    sueldo = 0.0;
    ventas = 0.0;
    constructor(id,nombre,apellido,edad,sueldo,ventas)
    {
        super(id,nombre,apellido,edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }
    toString()
    {
        return super.toString() + " sueldo : " + this.sueldo + " ventas : " + this.ventas;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}

class Cliente extends Persona
{
    compras = 0.0;
    telefono = "";
    constructor(id,nombre,apellido,edad,compras,telefono)
    {
        super(id,nombre,apellido,edad);
        this.compras = compras;
        this.telefono = telefono;
    }
    toString()
    {
        return super.toString() + " compras : " + this.compras + " telefono : " + this.telefono;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}

//////////////////////////////////////////////////////////FUNCIONALIDAD//////////////////////////////////////////////////////////

//let vector = [];

function $(id)
{
    return document.getElementById(id);
}

function crear(tipo)
{
    return document.createElement(tipo);
}

window.addEventListener("load",cargarGrillaYboton);

function tipoEmpleado(elemento,indice,vector)
{
    if(this == 1)
    {
        return elemento.sueldo > 0;// empleado tiene sueldo
    }
    
    if(this == 2)
    {
        return elemento.sueldo == 0;// cliente no tiene sueldo
    }
    if(this == 3)
    {
        return elemento.sueldo >= 0;// todos
    }
}


var vector1 = [ 
    // empleados : porque tienen un sueldo
    {"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000,"compras":0,"telefono":""},
    {"id":2,"nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000,"compras":0,"telefono":""},
    {"id":3, "nombre":"Facundo","apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000,"compras":0,"telefono":""},
    // clientes : no tienen sueldo y tienen compras
    {"id":4, "nombre":"Fernando", "apellido":"Nieto","edad":18,"ventas": 0, "sueldo":0 ,"compras":8000, "telefono":"152111131"},
    {"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20,"ventas": 0, "sueldo":0 ,"compras":50000, "telefono":"42040077"},
    {"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23,"ventas": 0, "sueldo":0 ,"compras":7000, "telefono":"1813181563"}
    ];


function filtrarVector()
{
    var combo = $("selector");
    if(combo)
    {
        var seleccionado = combo.options[combo.selectedIndex].value;
        return vector1.filter(tipoEmpleado, seleccionado);

    }
}



function cargarGrillaYboton()
{
    let vector = filtrarVector();
    cargarGrilla(vector);
    agregarBotonAgregar();
}

function cargarGrilla(vector)
{
   
    let tablaPrincipal = $("tablaPrincipal");
    //let combo = $("columnas");
    while (tablaPrincipal.firstChild) 
    {
        tablaPrincipal.removeChild(tablaPrincipal.firstChild);
    }
    // Crear el encabezado de la tabla
    var encabezado = crear('tr');

    if(vector.length > 0)
    {
        Object.keys(vector[0]).forEach(function(clave) 
        {

            if(checkboxTildado(clave))
            {
                var th = crear('th');
                th.textContent = clave;
                
                th.onclick = function() 
                {
                    ordenarPorColumna(clave);
                };
                
                
                encabezado.appendChild(th);
            }
        });

    
    }

    tablaPrincipal.appendChild(encabezado);
    
    // Crear las filas de la tabla
    function crearFilas() {
        // Eliminar filas existentes
        while (tablaPrincipal.rows.length > 1) 
        {
            tablaPrincipal.deleteRow(1);
        }
        if(vector.length > 0)
        {
            //let fila = 0;
            let idFila = 0;
            vector.map(function(objeto) 
            {
                var tr = crear('tr');
                
                Object.keys(objeto).map(function(clave) 
                {
                    if(checkboxTildado(clave))
                    {
                        var td = crear('td');
                        if(clave == "id")
                        {
                            idFila = objeto[clave]; // establezco el id desde el array para toda la fila   
                        }
                        td.textContent = objeto[clave];
                        
                        td.setAttribute("fila",idFila);
                        td.onclick = function() 
                        {
                            let fila = td.getAttribute("fila");
                            mostrarFilaEnFormularioABM(fila);
                            mostrarSeccionABM();
                        };

                        tr.appendChild(td);
                    }
                });
                //fila = fila + 1;
                tablaPrincipal.appendChild(tr);
                
            });

        }
        
    }
    crearFilas();
    
    // Función para ordenar por columna
    function ordenarPorColumna(clave) 
    {
        if(checkboxTildado(clave))
        {

            vector.sort(function(a, b) {
                if (typeof a[clave] === 'number') {
                    return a[clave] - b[clave];
                } else {
                    return a[clave].localeCompare(b[clave]);
                }
            });
            crearFilas();
        }
    }



    
}

function agregarBotonAgregar()
{
    
    let seccionABM = $("botonABM");
    if($("btnAgregar") == null)
    {

        let botonAgregar= crear("button");
        botonAgregar.id = "btnAgregar";
        botonAgregar.className = "boton";
        let textoBoton = document.createTextNode("Agregar");
        botonAgregar.appendChild(textoBoton);
        botonAgregar.addEventListener("click",mostrarSeccionABM);
        seccionABM.appendChild(botonAgregar);
    }
    
}


function mostrarSeccionABM()
{
    let seccionCabecera = $("cabecera");
    let seccionABM = $("seccionABM");
    let tablaPrincipal = $("tablaPrincipal");
    let botonAgregar = $("btnAgregar");
    seccionCabecera.style.display = "none";
    tablaPrincipal.style.display = "none";
    botonAgregar.style.display = "none";
    seccionABM.style.display = "block";
    $("btnAlta").disabled = false;
    $("abm.id").value = maxId();
    
}
function mostrarSeccionPrincipal()
{
    let seccionCabecera = $("cabecera");
    let seccionABM = $("seccionABM");
    let tablaPrincipal = $("tablaPrincipal");
    let botonAgregar = $("btnAgregar");
    seccionCabecera.style.display = "block";
    tablaPrincipal.style.display = "block";
    botonAgregar.style.display = "block";
    seccionABM.style.display = "none";   
    $("btnAlta").disabled = false; 
    LimpiarRegistroDeVector();
}


function checkboxTildado(clave)
{
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let respuesta = false;
    for(i=0;i<checkboxes.length;i++)
    {
        if (checkboxes[i].checked && checkboxes[i].id == clave) 
        {
            respuesta = true;
            break;
        }
    }
    return respuesta;
}


function recorrerVector()
{
    let vector = filtrarVector();
    let acumulado = 0;
    let promedio = 0.0;
    let campo = $("edadPromedio");

    let suma = vector.reduce(function(acumulado, item)
    {
        return acumulado + parseInt(item.edad);
    },0);
    if(suma > 0)
    {
        promedio = ( suma /  vector.length);
        campo.value = promedio;
    }
}

function mostrarFilaEnFormularioABM(fila)
{
    let vector = vector1;
    $("abm.fila").value = fila;
    for( let i = 0; i < vector.length ; i++)
    {
        if(vector[i].id == fila)
        {
            $("abm.id").value = vector[i].id;
            $("abm.id").disabled = true;
            $("abm.nombre").value = vector[i].nombre;
            $("abm.apellido").value = vector[i].apellido;
            $("abm.edad").value = vector[i].edad;
            $("abm.ventas").value = vector[i].ventas;
            $("abm.sueldo").value = vector[i].sueldo;
            $("abm.compras").value = vector[i].compras;
            $("abm.telefono").value = vector[i].telefono;
            break;
        }
    }

}





function maxId()
{
    let vector = filtrarVector();
    let cantidadItems = vector.length;
    let maximo = 0;
    let max = vector.reduce(function(maximo, item)
    {
        if(maximo < parseInt(item.id))
        {
            maximo = parseInt(item.id) 
        }
        return maximo;
    },0);
    return ++max;
}



function AgregarRegistroAVector()
{
    //let nuevo = [];
    //let vector = filtrarVector();
    //let vector = vector.push({"id":$("abm.id").value, "nombre":$("abm.nombre").value, "apellido":$("abm.apellido").value, "edad":$("abm.edad").value, "ventas":$("abm.ventas").value, "sueldo":$("abm.sueldo").value,"compras":$("abm.compras").value,"telefono":$("abm.telefono").value});
    vector1.push({"id":$("abm.id").value, "nombre":$("abm.nombre").value, "apellido":$("abm.apellido").value, "edad":$("abm.edad").value, "ventas":$("abm.ventas").value, "sueldo":$("abm.sueldo").value,"compras":$("abm.compras").value,"telefono":$("abm.telefono").value});

    mostrarSeccionPrincipal();
    cargarGrilla(vector1);
}

function ModificarRegistroDeVector()
{
    let vector = vector1;
    let fila = $("abm.fila").value;
    $("abm.id").disabled = false;
    for( let i = 0; i < vector.length ; i++)
    {
        if(vector[i].id == fila)
        {
            vector[i].nombre = $("abm.nombre").value;
            vector[i].apellido = $("abm.apellido").value;
            vector[i].edad = $("abm.edad").value;
            vector[i].ventas = $("abm.ventas").value;
            vector[i].sueldo = $("abm.sueldo").value;
            vector[i].compras = $("abm.compras").value;
            vector[i].telefono = $("abm.telefono").value;

            break;
        }
    }



    LimpiarRegistroDeVector();
    mostrarSeccionPrincipal();
    cargarGrilla(vector);
}

function BajaRegistroDeVector()
{
    let vector = vector1;
    let fila = $("abm.fila").value;
    $("abm.id").disabled = false;

    for( let i = 0; i < vector.length ; i++)
    {
        if(vector[i].id == fila)
        {
            vector.splice(i,1);
            break;
        }
    }

    LimpiarRegistroDeVector();
    mostrarSeccionPrincipal();
    cargarGrilla(vector);

}

function LimpiarRegistroDeVector()
{
    $("abm.fila").value = 0;
    $("abm.id").value = 0;
    $("abm.id").disabled = true;
    $("abm.nombre").value = "";
    $("abm.apellido").value = "";
    $("abm.edad").value = 0;
    $("abm.ventas").value = 0;
    $("abm.sueldo").value = 0;
    $("abm.compras").value = 0;
    $("abm.telefono").value = "";
}