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



// CREAT TAREA


function agregarTarea(){

    let textoTarea = inputCrearTarea.value;
    let tarea =`<div class="tarea">
<button class="btn-check" id="terminar">
    <img src="./icons/no-check.png" alt="">
</button>
<p class="texto" id="texto">${textoTarea}</p>
<button class="btn-eliminar" id="eliminar">
    <img src="./icons/tacho.png" alt="">
</button>
<button class="btn-editar" id="editar">
    <img src="./icons/editar.png" alt="">
</button>
</div>`;

    if(textoTarea){
        contenedorTareas.insertAdjacentHTML("beforeend", tarea);
        inputCrearTarea.value = "";

        botonElimiarTarea = Array.from(document.querySelectorAll("#eliminar"));
        botonTerminarTarea = Array.from(document.querySelectorAll("#terminar"));
        botonEditarTarea = Array.from(document.querySelectorAll("#editar"));

        eliminarTarea();
        terminarTarea();
        editarTarea ();
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
    contenedorTareas.innerHTML = "";
}

botonElimiarTodas.addEventListener("click", eliminarTodas);

// ELIMINAR TAREA

function eliminarTarea () {
    botonElimiarTarea.forEach(element => {
        element.onclick = () => {
            element.parentNode.remove();
        }
    });
}

// TERMINAR TAREA

function terminarTarea () {
    botonTerminarTarea.forEach(element => {
        element.onclick = () => {
            element.parentNode.classList.add("terminada");
            
            var checked = document.createElement("button");
            checked.classList.add("check");
            var contenidoCheck =`<img src="./icons/check.png" alt="">`
            checked.innerHTML = contenidoCheck;
            element.replaceWith(checked);

            botonesCheked = Array.from(document.getElementsByClassName("check"));
            removeCheck();
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

            inputEdit = Array.from(document.getElementsByClassName("edit"));
            editarConEnter();
            registrarElementosEdit();
            confirmarTarea();
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
            }
        }

    });
})}

