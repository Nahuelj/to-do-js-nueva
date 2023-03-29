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
<button class="boton-check" id="terminar">
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

        texto = Array.from(document.querySelectorAll("#texto"));

        eliminarTarea();
        terminarTarea();
        editarTarea ();
        personalizar();
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
            checked.classList.add("boton-check");
            checked.setAttribute("id", "negro");
            var contenidoCheck =`<img src="./icons/check.png" alt="">`
            checked.innerHTML = contenidoCheck;
            element.replaceWith(checked);

            botonesCheked = Array.from(document.querySelectorAll("#negro"));
            removeCheck();
            guardarStorage();
        }
    });
}

function removeCheck (){
    botonesCheked.forEach((boton)=>{
    boton.onclick = () => {
        boton.parentNode.classList.remove("terminada");
        boton.parentNode.classList.add("creada");
        let botonCheck = document.createElement("button");
        botonCheck.setAttribute("id", "terminar");
        botonCheck.classList.add("boton-check");
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
            <button class="boton-check" id="terminar">
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
                contenedorTareaModificada.classList.add("creada");
                contenedorTareaModificada.insertAdjacentHTML("beforeend", nuevaTarea);
                let padre = item.parentNode;
                padre.replaceWith(contenedorTareaModificada);
                contenedorTareaModificada.classList.remove("editando");

                botonElimiarTarea = Array.from(document.querySelectorAll("#eliminar"));
                botonTerminarTarea = Array.from(document.querySelectorAll("#terminar"));
                botonEditarTarea = Array.from(document.querySelectorAll("#editar"));
                registrarElementosEdit();
                eliminarTarea();
                terminarTarea();
                editarTarea ();
                personalizar();
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

            inputEdit = Array.from(document.getElementsByClassName("edit"));
            

            editarConEnter();
            registrarElementosEdit();
            confirmarTarea();
            personalizar();
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
            <button class="boton-check" id="terminar">
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
                contenedorTareaModificada.classList.add("creada");
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
                personalizar();
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
        botonesCheked = Array.from(document.querySelectorAll("#negro"));
        botonesCheked = Array.from(document.getElementsByClassName("boton-check"));
        botonEditarTarea = Array.from(document.querySelectorAll("#editar"));

        eliminarTarea();
        terminarTarea();
        removeCheck ();
        editarTarea ();
        registrarElementosEdit();
        confirmarTarea();
        editarConEnter();
    }
}

function guardarTema(){
    localStorage.setItem("colorFondo", JSON.stringify(inputColorFondo.value));
    localStorage.setItem("colorTarjeta", JSON.stringify(inputColorTarjeta.value));
    localStorage.setItem("colorFondoTexto", JSON.stringify(inputColorFondoTexto.value));
    localStorage.setItem("colorTexto", JSON.stringify(inputColorTexto.value));
}

function recuperarTema(){

    inputColorFondo.value = JSON.parse(localStorage.getItem("colorFondo"));
    inputColorTarjeta.value = JSON.parse(localStorage.getItem("colorTarjeta"));
    inputColorFondoTexto.value = JSON.parse(localStorage.getItem("colorFondoTexto"));
    inputColorTexto.value = JSON.parse(localStorage.getItem("colorTexto"));

    personalizar();
}







// TEMAS    
// BOTONES CLARO-OSCURO
const botonClaro = document.querySelector("#boton-claro");
const botonOscuro = document.querySelector("#boton-oscuro");
const botonPersonalizar = document.querySelector("#boton-personalizar");
const botonClose = document.querySelector("#boton-close");



// ELEMENTOS A MODIFICAR

const body = document.getElementById("cuerpo");
const inputPrincipal = document.getElementById("contenedor-input");
let tarjeta = Array.from(document.getElementsByClassName("tarea"));
let texto = Array.from(document.querySelectorAll("#texto"));
const todo = document.getElementById("to-do-logo");





// INPUT PERSONALIZACION

const inputColorFondo = document.getElementById("color-fondo");
const inputColorTarjeta = document.getElementById("color-tarjeta");
const inputColorFondoTexto = document.getElementById("color-fondo-texto");
const inputColorTexto = document.getElementById("color-texto");
const botonGuardar = document.getElementById("boton-guardar");

inputColorFondo.value = "#ADD8E6";
inputColorTarjeta.value = "#94A8AF"
inputColorFondoTexto.value = "#333A3C";
inputColorTexto.value = "#FFFFFF"


// EVENTOS


function personalizar() {
    
    body.style.backgroundColor = inputColorFondo.value;
    inputPrincipal.style.backgroundColor = inputColorTarjeta.value;
    inputCrearTarea.style.backgroundColor = inputColorFondoTexto.value;
    inputCrearTarea.style.color = inputColorTexto.value;
    
    
    function colorTarjeta(){
        tarjeta = Array.from(document.getElementsByClassName("tarea"));
        tarjeta.forEach(item => {
        item.style.backgroundColor = inputColorTarjeta.value;
    });
}   
    colorTarjeta();

    function colorTexto(){
        texto.forEach(element => {
            texto = Array.from(document.querySelectorAll("#texto"));
            element.style.backgroundColor = inputColorFondoTexto.value;
            element.style.color = inputColorTexto.value;
        });
    }

    colorTexto();
    guardarTema();
    
}

botonGuardar.addEventListener("click", personalizar);
botonGuardar.addEventListener("click", ()=>{
    
    botonPersonalizar.click();

    function cerrar (){
        botonClose.click();
    }
    setTimeout(cerrar, 600);
});


function temaClaro(){
    inputColorFondo.value = "#ADD8E6";
    inputColorTarjeta.value = "#94A8AF"
    inputColorFondoTexto.value = "#161F21";
    inputColorTexto.value = "#FFFFFF"
    todo.style.color = "black";
    personalizar();
    guardarTema();
}


function temaOscuro(){
    inputColorFondo.value = "#1B4958";
    inputColorTarjeta.value = "#405A62"
    inputColorFondoTexto.value = "#161F21";
    inputColorTexto.value = "#FFFFFF"
    todo.style.color = "#FFFFFF"
    personalizar();
    guardarTema();
}

botonOscuro.addEventListener("click", temaOscuro);
botonOscuro.addEventListener("click", ()=>{
    botonClose.click();
});

botonClaro.addEventListener("click", temaClaro);
botonClaro.addEventListener("click", ()=>{
    botonClose.click();
});

recuperarTema();