# Tarea3-LenguajeMarcas
## Proyecto
El presente proyecto para la asignatura *Lenguaje de Marcas* consiste en la creacción de un cuestionario de 10 preguntas que se gestione y se corrija en función de un fichero externo *XML*. En éste constarán las preguntas, las alternativas y las respuestas correctas, todo lo cual deberá ser leído por el código *Javascript* e integrado en la aplicación.

[Visualizar Index en Rawgit](https://rawgit.com/shamshir/Tarea3-LenguajeMarcas/master/index.html)

[Visualizar Test en Rawgit](https://rawgit.com/shamshir/Tarea3-LenguajeMarcas/master/test.html)

## Funcionamiento General
## Código JavaScript
El código *JavaScript* está organizado en 7 bloques diferenciados, con el objetivo de organizar mejor el código y que éste sea más legible. Cabe destacar que los tres apartados que empiezan por *Funciones de la...*, siguen el mismo patrón: primero encontramos un switch que dirige el código en función del tipo de pregunta (text, select, multiple, checkbox o radio) y, después, encontramos el resto de funciones a las que el switch puede llamar. Generalmente se trata de funciones específicas para cada tipo de pregunta o, en algunos casos, funciones que sirven para más de un tipo de pregunta, en cuyo caso se ha elegido un nombre descriptivo que ayuda a identificar para cuáles corresponde.

A continuación se describen en más profundidad todos los apartados.
### Variables Globales
Este apartado recoge aquellas variables que serán utilizadas por todo el código, desde atajos a elementos del *XML* o del *HTML*, pasando por los arrays en los que se guardarán las respuestas correctas, siguiendo por las variables del control del tiempo, hasta el valor de la nota del examen.
### Window Onload
El bloque Window Onload recibe este nombre porque contiene exclusivamente aquellas acciones que entran en funcionamiento una vez que la página ya ha cargado. Contiene, principalmente, el código para leer el *XML* mediante la *httpRequest* y, además, redirige el flujo del código a la sección *Funciones de la Gestión del XML* para gestionar el *XML* que ha leído.

Cabe destacar que también se encuentran en este apartado las funciones de los distintos botones que aparecen en la aplicación, especificando qué ocurrirá al pulsar cada uno de ellos.
### Funciones de la Gestión del XML
Una vez tenemos ya el *XMLDoc* completo, hay que colocar toda la información en el código *HTML* y guardar las respuestas correctas en variables (arrays en este caso) de *JavaScript*. De eso se encarga este bloque, contando con un bucle principal que se repite tantas veces como preguntas haya en el *XML*. En cada una de las iteraciones, el bucle coloca el título de la pregunta y guarda la respuesta o respuestas en un array, identificado con el número de pregunta (empezando por 0). A continuación llega a un switch que ejecuta funciones específicas en función del tipo de pregunta: en las preguntas de tipo "text" no se realizará ninguna acción más, mientras que en en resto de preguntas de procederá a colocar las opciones correspondientes en el *HTML*.
### Funciones de la Comprobación
Este apartado del código engloba una de las dos premisas que tienen que cumplirse para poder corregir el cuestionario: que el participante haya contestado todas y cada una de las preguntas.
### Funciones de la Corrección
### Control del Tiempo
### Atajos
## Diferencias entre Versiones
Todas las diferencias que podemos encontrar entre la versión de escritorio y la versión de móvil, se encuentran en el *CSS*, ya que se trata de cambios en la presentación y no en la funcionalidad, que es exactamente la misma para ambas versiones.

En primer lugar, debido a que los elementos en la versión móvil ocupan la mayor parte de la pantalla, el fondo de piedra ha sido eliminado. Esto ayuda a cargar la página más rápido en el móvil y reemplaza la imagen de fondo por un fondo negro, que encaja con el resto de la estética de la aplicación.

En segundo lugar, se han eliminado en la versión móvil todos los cambios y transiciones que se producen en la versión de escritorio cuando pasamos el cursor por encima de algunos elementos. Es decir, se han eliminado del *CSS* todas aquellas propiedades que dependen de *:hover*. La razón para eliminar estas propiedades es debido a que en el móvil no es posible pasar el cursor por envima de ningún elemento, por lo que *:hover* no funciona.

En tercer lugar, como es lógico, se han ajustado todos los elementos para que ocupen la ayor cantidad de pantalla posible, para que el diseño sea más ergonómico y fácil de utilizar en un entorno móvil. Se han agrandado el tamaño de las partes interactivas de las preguntas y éstas se han extendido para ocupar todo el ancho de la pantalla. No obstante, se ha mantenido la organización general de los elementos en el cuestionario en sí, dejando tanto el logo en la parte superior como el dinosaurio y el fuego en la parte inferior, visibles en todo momento. Esto hace, como ya se ha comentado, que el funcionamiento de la aplicación sea el mismo, tanto en móvil como en escritorio.
## Apartado Gráfico
