// ELEMENTOS
const inputCrearTarea = document.querySelector("#input-principal");
const botonCrearTareas = document.querySelector("#crearTarea");
const botonElimiarTodas = document.querySelector("#eliminarTodas");
const contenedorTareas = document.querySelector("#container");

// elementos creados con dom
var botonElimiarTarea;
var botonTerminarTarea;
var botonEditarTarea;
var botonConfirmarEdit;
var inputEdit;
var botonesCheked = [];


// CARGAR STORAGE

recuperarStorage();

// CREAT TAREA


function agregarTarea(){

    let textoTarea = inputCrearTarea.value;
    let tarea =`
<button class="btn-check" id="terminar">
    <img src="./icons/no-check.png" alt="">
</button>
<p class="texto" id="texto">${textoTarea}</p>
<button class="btn-eliminar" id="eliminar">
    <img src="./icons/tacho.png" alt="">
</button>
<button class="btn-editar" id="editar">
    <img src="./icons/editar.png" alt="">
</button>`;
    let divTarea = document.createElement("div");
    divTarea.classList.add("tarea");
    divTarea.classList.add("creada");
    divTarea.insertAdjacentHTML("beforeend", tarea);

    if(textoTarea){

        contenedorTareas.insertAdjacentElement("beforeend", divTarea);
        inputCrearTarea.value = "";

        botonElimiarTarea = Array.from(document.querySelectorAll("#eliminar"));
        botonTerminarTarea = Array.from(document.querySelectorAll("#terminar"));
        botonEditarTarea = Array.from(document.querySelectorAll("#editar"));

        eliminarTarea();
        terminarTarea();
        editarTarea ();
        guardarStorage();
    }
    else{
        alert("ingrese tarea")
    }
}

function crearConEnter (event) {
    if(event.key == "Enter"){
        agregarTarea();
    }
}

botonCrearTareas.addEventListener("click", agregarTarea);

inputCrearTarea.addEventListener("keyup", crearConEnter);


// ELIMINAR TODAS

function eliminarTodas (){
    contenedorTareas.classList.add("eliminada");

    function borrarTodo (){
        contenedorTareas.innerHTML = "";
        guardarStorage();
    }

    setTimeout(borrarTodo, 100)
    
    function volverNormal(){
        contenedorTareas.classList.remove("eliminada");
        guardarStorage();
    }

    setTimeout(volverNormal, 1000);
}

botonElimiarTodas.addEventListener("click", eliminarTodas);

// ELIMINAR TAREA

function eliminarTarea () {
    botonElimiarTarea.forEach(element => {
        element.onclick = () => {
            element.parentNode.classList.remove("creada");
            element.parentNode.classList.remove("editando");
            element.parentNode.classList.add("eliminada");
                function removerPadre(){
                element.parentNode.remove();
                guardarStorage();

                }
                setTimeout(removerPadre, 350)
                
        }
    });
}

// TERMINAR TAREA

function terminarTarea () {
    botonTerminarTarea.forEach(element => {
        element.onclick = () => {
            element.parentNode.classList.remove("creada");
            element.parentNode.classList.add("terminada");
            
            var checked = document.createElement("button");
            checked.classList.add("check");
            var contenidoCheck =`<img src="./icons/check.png" alt="">`
            checked.innerHTML = contenidoCheck;
            element.replaceWith(checked);

            botonesCheked = Array.from(document.getElementsByClassName("check"));
            removeCheck();
            guardarStorage();
        }
    });
}

function removeCheck (){
    botonesCheked.forEach((boton)=>{
    boton.onclick = () => {
        boton.parentNode.classList.remove("terminada");

        let botonCheck = document.createElement("button");
        botonCheck.setAttribute("id", "terminar");
        botonCheck.classList.add("btn-check");
        botonCheck.innerHTML = `<img src="./icons/no-check.png" alt="">`
        
        boton.replaceWith(botonCheck);
        botonTerminarTarea = Array.from(document.querySelectorAll("#terminar"));
        terminarTarea();
        guardarStorage();
        
    };
});
}



// EDITAR TAREA

function registrarElementosEdit(){
    botonConfirmarEdit = Array.from(document.getElementsByClassName("btn-confirmar"));
    inputEdit = Array.from(document.getElementsByClassName("edit"));
}

function confirmarTarea(){
    botonConfirmarEdit.forEach((item) => {
        item.onclick = () => {
            let valorNuevo = item.parentNode.firstElementChild.value;
            let nuevaTarea = `
            <button class="btn-check" id="terminar">
                <img src="./icons/no-check.png" alt="">
            </button>
            <p class="texto" id="texto">${valorNuevo}</p>
            <button class="btn-eliminar" id="eliminar">
                <img src="./icons/tacho.png" alt="">
            </button>
            <button class="btn-editar" id="editar">
                <img src="./icons/editar.png" alt="">
            </button>`;

            if(valorNuevo){
                
                let contenedorTareaModificada = document.createElement('div');
                contenedorTareaModificada.classList.add("tarea");
                contenedorTareaModificada.classList.add("editando");
                contenedorTareaModificada.insertAdjacentHTML("beforeend", nuevaTarea);
                let padre = item.parentNode;
                padre.replaceWith(contenedorTareaModificada);


                botonElimiarTarea = Array.from(document.querySelectorAll("#eliminar"));
                botonTerminarTarea = Array.from(document.querySelectorAll("#terminar"));
                botonEditarTarea = Array.from(document.querySelectorAll("#editar"));
                registrarElementosEdit();
                eliminarTarea();
                terminarTarea();
                editarTarea ();
                guardarStorage();
            }
            else{
                return;
            }
        }
    })
}



function editarTarea () {
    botonEditarTarea.forEach(element => {
        element.onclick =  function editar () {
            let parrafo = element.parentNode.childNodes[3];
            let textoDelParrafo = parrafo.innerHTML;
            let elementoEdit = `
            <input type="text" value="${textoDelParrafo}" class="edit">
            <button class="btn-confirmar" >
                <img src="./icons/confirmar.png" alt="">
            </button>`;

            let contenedorEdit = document.createElement('div');
            contenedorEdit.classList.add("tarea");
            contenedorEdit.classList.add("editando");
            contenedorEdit.insertAdjacentHTML("beforeend", elementoEdit);

            let padre = element.parentNode;
            padre.replaceWith(contenedorEdit);

            let inputFocus = contenedorEdit.firstElementChild;
            inputFocus.focus();
            inputFocus.selectionStart = inputFocus.value.length;
            console.log(contenedorEdit);

            inputEdit = Array.from(document.getElementsByClassName("edit"));
            

            editarConEnter();
            registrarElementosEdit();
            confirmarTarea();
            guardarStorage();
        }
    });
}

function editarConEnter () {
    inputEdit.forEach((input)=>{
        input.addEventListener("keyup", function(event){
            if(event.key == "Enter"){

                let valorNuevo = input.parentNode.firstElementChild.value;
                let nuevaTarea = `
            <button class="btn-check" id="terminar">
                <img src="./icons/no-check.png" alt="">
            </button>
            <p class="texto" id="texto">${valorNuevo}</p>
            <button class="btn-eliminar" id="eliminar">
                <img src="./icons/tacho.png" alt="">
            </button>
            <button class="btn-editar" id="editar">
                <img src="./icons/editar.png" alt="">
            </button>`;

            if(valorNuevo){
                
                let contenedorTareaModificada = document.createElement('div');
                contenedorTareaModificada.classList.add("tarea");
                contenedorTareaModificada.classList.add("editando");
                contenedorTareaModificada.insertAdjacentHTML("beforeend", nuevaTarea);
                let padre = input.parentNode;
                padre.replaceWith(contenedorTareaModificada);


                botonElimiarTarea = Array.from(document.querySelectorAll("#eliminar"));
                botonTerminarTarea = Array.from(document.querySelectorAll("#terminar"));
                botonEditarTarea = Array.from(document.querySelectorAll("#editar"));
                registrarElementosEdit();
                eliminarTarea();
                terminarTarea();
                editarTarea ();
                guardarStorage();
            }
        }

    });
})}

// FECHA
// Obtener la fecha actual
const fecha = new Date();

// Obtener los nombres de los días y meses en español
const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Obtener el día de la semana, el día del mes y el año
const diaSemana = dias[fecha.getDay()];
const diaMes = fecha.getDate();
const mes = meses[fecha.getMonth()];
const anio = fecha.getFullYear();

// Obtener el elemento HTML en el que se mostrará la fecha
const fechaActual = document.getElementById("fecha-actual");

// Actualizar el contenido del elemento HTML con la fecha actual
fechaActual.textContent = `${diaSemana}, ${diaMes} de ${mes} de ${anio}`;

// LOCAL STORAGE

function guardarStorage (){
    let tareas = contenedorTareas.innerHTML;
    localStorage.setItem("sesion", JSON.stringify(tareas));
}

function recuperarStorage (){
    if(localStorage.getItem("sesion")){
        let tareasRegistradas = JSON.parse(localStorage.getItem("sesion"));
        contenedorTareas.insertAdjacentHTML("beforeend", tareasRegistradas);

        botonElimiarTarea = Array.from(document.querySelectorAll("#eliminar"));
        botonTerminarTarea = Array.from(document.querySelectorAll("#terminar"));
        botonEditarTarea = Array.from(document.querySelectorAll("#editar"));

        eliminarTarea();
        terminarTarea();
        editarTarea ();
    }
}