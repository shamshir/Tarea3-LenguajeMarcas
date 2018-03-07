/* -------------------------- Variables Globales -------------------------- */

var xmlDoc = null;

var numPreguntas = null;
var tituloHtml = null;
var tituloXml = null;
var preguntaXml = null;

var respuestas0 = [];
var respuestas1 = [];
var respuestas2 = [];
var respuestas3 = [];
var respuestas4 = [];
var respuestas5 = [];
var respuestas6 = [];
var respuestas7 = [];
var respuestas8 = [];
var respuestas9 = [];

var tiempo = 300;
var intervalo = 0.0;
var temporizador = null;

var corregido = false;

var nota = 0.0;

/* -------------------------- Window Onload -------------------------- */

window.onload = function(){
	var url = "https://rawgit.com/shamshir/Prueba/master/questions.xml";
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
	
	temporizador = setInterval(contadorTiempo,1000);
	
	document.getElementById("divFuego").onclick = function(){
		if (corregido == false && comprobarRespuestas()){
			corregirPreguntas();
		}
	}
	
	document.getElementById("boton1").onclick = function(){
		location.href = "index.html";
	}
	
	document.getElementById("boton2").onclick = function(){
		location.href = "test.html";
	}
	
	document.getElementById("boton3").onclick = function(){
		document.getElementById("main2").style.display = "block";
		document.getElementById("main3").style.display = "none";
		document.getElementById("main4").style.display = "none";
		document.getElementById("botonVolver").style.display = "block";
		document.getElementById(0).scrollIntoView();
	}
	
	document.getElementById("botonVolver").onclick = function(){
		document.getElementById("main2").style.display = "none";
		document.getElementById("main3").style.display = "block";
		document.getElementById("main4").style.display = "block";
		document.getElementById("botonVolver").style.display = "none";
	}
	
}

/* -------------------------- Funciones de la Gestión del XML -------------------------- */

function gestionarXml (datosXml){
	
	xmlDoc = datosXml.responseXML;
	
	creacionAtajos();
	
	for (i = 0; i < numPreguntas; i++) {
	
		tituloHtml[i].innerHTML = tituloXml[i].innerHTML;
		
		leerRespuestas(i);
		
		var tipo = atajoType(i);
	
		switch (tipo){
		
			case "text":
				break;
		
			case "select":
			case "multiple":
				var opciones = leerOpciones(i);
				colocarOpcionesSelectMultiple(opciones, i);
				break;
				
			case "checkbox":
			case "radio":
				var opciones = leerOpciones(i);
				colocarOpcionesCheckboxRadio(opciones, i);
				break;
			
			default:
				alert("Error de tipo de pregunta");
				break;
				
		}
	}
}

function leerOpciones(i){
	var opciones = [];
	var numOpciones = preguntaXml[i].getElementsByTagName("option").length;
	for (j = 0; j < numOpciones; j++) {
		opciones[j] = atajoOption(i, j);
	}
	return opciones;
}

function leerRespuestas(i){
	var numRespuestas = preguntaXml[i].getElementsByTagName("answer").length;
	for (j = 0; j < numRespuestas; j++) {
		window["respuestas" + i][j] = atajoAnswer(i, j);
	}
}

function colocarOpcionesSelectMultiple(opt, i){
	var pregunta = document.getElementById("sel" + i);
	var numRespuestas = preguntaXml[i].getElementsByTagName("answer").length;
	if (numRespuestas > 1){
		pregunta.size = opt.length;
	}
	for (j = 0; j < opt.length; j++) {
		var option = document.createElement("option");
		option.text = opt[j];
		option.value = j + 1;
		pregunta.options.add(option);
	}
}

function colocarOpcionesCheckboxRadio(opt, i){
	var contenedor = document.getElementById(i);
	for (j = 0; j < opt.length; j++) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML = opt[j];
		label.setAttribute("for", "opcion" + i + j);
		if (atajoType(i) == "checkbox"){
			input.type = "checkbox";
		} else {
			input.type = "radio";
		}
		input.name = "opciones" + i;
		input.id = "opcion" + i + j;
		contenedor.appendChild(input);
		contenedor.appendChild(label);
		contenedor.appendChild(document.createElement("br"));
	}
	contenedor.appendChild(document.createElement("br"));
}

/* -------------------------- Funciones de la Comprobación -------------------------- */

function comprobarRespuestas(){
	
	var comprobacion = true;
	
	for(i = 0; i < numPreguntas; i++){
		
		var tipo = atajoType(i);
	
		switch (tipo){
		
			case "text":
				if (document.getElementById("text" + i).value == ""){
					llamadaAtencion(i);
					comprobacion = false;
				}
				break;
		
			case "select":
				if (document.getElementById("sel" + i).selectedIndex == 0){
					llamadaAtencion(i);
					comprobacion = false;
				}
				break;
				
			case "multiple":
				if (!comprobacionMultiple(i)){
					llamadaAtencion(i);
					comprobacion = false;
				}
				break;
				
			case "checkbox":
			case "radio":
				if (!comprobacionCheckboxRadio(i)){
					llamadaAtencion(i);
					comprobacion = false;
				}
				break;
			
			default:
				alert("Error de tipo de pregunta");
				break;
				
		}
		
		if (comprobacion == false){
			break;
		}
		
	}
	
	return comprobacion;
}

function comprobacionMultiple(i){
	var seleccionada = false;
	var respuesta = document.getElementById("sel" + i).getElementsByTagName("option");
	for (j = 0; j < respuesta.length; j++) {
		if (respuesta[j].selected){
			seleccionada = true;
		} 
	}
	if (!seleccionada){
		return false;
	}
	return true;
}

function comprobacionCheckboxRadio(i){
	var seleccionada = false;
	var respuesta = document.getElementById(i).getElementsByTagName("input");
	for (j = 0; j < respuesta.length; j++) {
		if (respuesta[j].checked){
			seleccionada = true;
		}
	}
	if (!seleccionada){
		return false;
	}
	return true;
}

function llamadaAtencion(i){
	
	document.getElementById(i).scrollIntoView();
	
	document.getElementById(i).style.borderColor = "red";
	setTimeout(function(){
		document.getElementById(i).style.borderColor = "rgb(141, 198, 63)";
		document.getElementById(i).style.backgroundColor = "red";
	}, 250);
	setTimeout(function(){
		document.getElementById(i).style.borderColor = "red";
		document.getElementById(i).style.backgroundColor = "black";
	}, 500);
	setTimeout(function(){
		document.getElementById(i).style.borderColor = "rgb(141, 198, 63)";
		document.getElementById(i).style.backgroundColor = "red";
	}, 750);
	setTimeout(function(){
		document.getElementById(i).style.borderColor = "red";
		document.getElementById(i).style.backgroundColor = "black";
	}, 1000);
	setTimeout(function(){
		document.getElementById(i).style.borderColor = "rgb(141, 198, 63)";
	}, 1250);
}

/* -------------------------- Funciones de la Corrección -------------------------- */

function corregirPreguntas(){
	
	nota = 0.0;
	
	for(i = 0; i < numPreguntas; i++){
		
		var tipo = atajoType(i);
	
		switch (tipo){
		
			case "text":
				corregirText(i);
				break;
		
			case "select":
				corregirSelect(i);
				break;
				
			case "multiple":
				corregirMultiple(i);
				break;
				
			case "checkbox":
				corregirCheckbox(i);
				break;
			
			case "radio":
				corregirRadio(i);
				break;
			
			default:
				alert("Error de tipo de pregunta");
				break;
				
		}
		
	}
	
	clearInterval(temporizador);
	
	corregido = true;
	
	mostrarNota();
	
}

function corregirText(i){
	var respuestaDada = document.getElementById("text" + i).value;
	if (respuestaDada.toUpperCase() == window["respuestas" + i][0].toUpperCase()){
		nota += 1;
	} else {
		document.getElementById(i).style.borderColor = "red";
		var respuestaCorrecta = document.createElement("h2");
		respuestaCorrecta.innerHTML = "La respuesta correcta es: " + atajoAnswer(i,0);
		document.getElementById(i).appendChild(respuestaCorrecta);
	}
}

function corregirSelect(i){
	var respuestaDada = document.getElementById("sel" + i);
	if (respuestaDada.selectedIndex == window["respuestas" + i][0]){
		nota += 1;
	} else {
		document.getElementById(i).style.borderColor = "red";
		var respuestaCorrecta = document.createElement("h2");
		respuestaCorrecta.innerHTML = "La respuesta correcta es: " + atajoOption(i,(atajoAnswer(i,0) - 1));
		document.getElementById(i).appendChild(respuestaCorrecta);
	}
}

function corregirMultiple(i){
	var respuesta = document.getElementById("sel" + i).getElementsByTagName("option");
	var incremento = 0;
	for (j = 0; j < respuesta.length; j++) {
		if (respuesta[j].selected){
			var acierto = false;
			for (k = 0; k < window["respuestas" + i].length; k++) {
				if (j == window["respuestas" + i][k]){
					acierto = true;
				}
			}
			if (acierto){
				incremento += (1.00 / window["respuestas" + i].length);
			} else {
				incremento -= (1.00 / window["respuestas" + i].length);
			}
		} 
	}
	nota += incremento;
	if (incremento < 0.95){
		respuestasCorrectas(i);
	}
}

function corregirCheckbox(i){
	var respuesta = document.getElementById(i).getElementsByTagName("input");
	var incremento = 0;
	for (j = 0; j < respuesta.length; j++) {
		if (respuesta[j].checked){
			var acierto = false;
			for (k = 0; k < window["respuestas" + i].length; k++) {
				if (j == window["respuestas" + i][k]){
					acierto = true;
				}
			}
			if (acierto){
				incremento += (1.00 / window["respuestas" + i].length);
			} else {
				incremento -= (1.00 / window["respuestas" + i].length);
			}
		}
	}
	nota += incremento;
	if (incremento < 0.95){
		respuestasCorrectas(i);
	}
}

function corregirRadio(i){
	var respuesta = document.getElementById(i).getElementsByTagName("input");
	var incremento = 0;
	for (j = 0; j < respuesta.length; j++) {
		if (respuesta[j].checked){
			if (j == window["respuestas" + i][0]){
				incremento = 1;
			}
		}
	}
	if (incremento == 1){
		nota += incremento;
	} else {
		document.getElementById(i).style.borderColor = "red";
		var respuestaCorrecta = document.createElement("h2");
		respuestaCorrecta.innerHTML = "La respuesta correcta es: " + atajoOption(i,atajoAnswer(i,0));
		document.getElementById(i).appendChild(respuestaCorrecta);
	}
	
}
function respuestasCorrectas(i){
	document.getElementById(i).style.borderColor = "red";
	var textoNuevo = document.createElement("h2");
	textoNuevo.innerHTML = "Las respuestas correctas son:";
	document.getElementById(i).appendChild(textoNuevo);
	var numRespuestas = preguntaXml[i].getElementsByTagName("answer").length;
	for (j = 0; j < numRespuestas; j++) {
		var textoNuevo = document.createElement("h2");
		textoNuevo.innerHTML = atajoOption(i,atajoAnswer(i,j));
		document.getElementById(i).appendChild(textoNuevo);
	}
}

function mostrarNota(){
	document.getElementById("main2").style.display = "none";
	document.getElementById("main4").style.display = "block";
	document.getElementById("nota").innerHTML = notaConvertida();
	if (notaConvertida() >= 5){
		document.getElementById("mensaje").innerHTML = "¡Enhorabuena! ¡Has pasado el test de acceso!";
	} else {
		document.getElementById("mensaje").innerHTML = "Vaya...no has aprobado el examen de acceso...";
	}
}

function notaConvertida(){
	var notaMod
	if (nota < 0){
		notaMod = 0;
	} else {
		notaMod = parseFloat(nota.toFixed(2));
	}
	return notaMod;
}

/* -------------------------- Control del Tiempo -------------------------- */

function contadorTiempo(){
	tiempo -= 1;
	if (tiempo > 0){
		intervalo += 0.234;
		document.getElementById("divDino").style.left = intervalo + "%";
	} else {
		if (corregido == false){
			corregirPreguntas();
		}
	}
}

/* -------------------------- Atajos -------------------------- */

function creacionAtajos(){
	numPreguntas = xmlDoc.getElementsByTagName("title").length;
	tituloHtml = document.getElementsByTagName("h2");
	tituloXml = xmlDoc.getElementsByTagName("title");
	preguntaXml = xmlDoc.getElementsByTagName("question");
}

function atajoType(i){
	var atajo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("type")[0].innerHTML;
	return atajo;
}

function atajoOption(i, j){
	var atajo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
	return atajo;
}

function atajoAnswer(i, j){
	var atajo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[j].innerHTML;
	return atajo;
}