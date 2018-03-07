# Tarea3-LenguajeMarcas
## Proyecto
El presente proyecto para la asignatura *Lenguaje de Marcas* consiste en la creacción de un cuestionario de 10 preguntas que se gestione y se corrija en función de un fichero externo *XML*. En éste constarán las preguntas, las alternativas y las respuestas correctas, todo lo cual deberá ser leído por el código *Javascript* e integrado en la aplicación.

[Visualizar Index en Rawgit](https://rawgit.com/shamshir/Tarea3-LenguajeMarcas/master/index.html)

[Visualizar Test en Rawgit](https://rawgit.com/shamshir/Tarea3-LenguajeMarcas/master/test.html)

## Funcionamiento General
## Diferencias entre Versiones
Todas las diferencias que podemos encontrar entre la versión de escritorio y la versión de móvil, se encuentran en el *CSS*, ya que se trata de cambios en la presentación y no en la funcionalidad, que es exactamente la misma para ambas versiones.

En primer lugar, debido a que los elementos en la versión móvil ocupan la mayor parte de la pantalla, el fondo de piedra ha sido eliminado. Esto ayuda a cargar la página más rápido en el móvil y reemplaza la imagen de fondo por un fondo negro, que encaja con el resto de la estética de la aplicación.

En segundo lugar, se han eliminado en la versión móvil todos los cambios y transiciones que se producen en la versión de escritorio cuando pasamos el cursor por encima de algunos elementos. Es decir, se han eliminado del *CSS* todas aquellas propiedades que dependen de *:hover*. La razón para eliminar estas propiedades es debido a que en el móvil no es posible pasar el cursor por envima de ningún elemento, por lo que *:hover* no funciona.

En tercer lugar, se han ajustado todos los elementos para que ocupen la ayor cantidad de pantalla posible, para que el diseño sea más ergonómico y fácil de utilizar en un entorno móvil. Se han agrandado el tamaño de las partes interactivas de las preguntas y éstas se han extendido para ocupar todo el ancho de la pantalla. No obstante, se ha mantenido la organización general de los elementos en el cuestionario en sí, dejando tanto el logo en la parte superior como el dinosaurio y el fuego en la parte inferior, visibles en todo momento. Esto hace, como ya se ha comentado, que el funcionamiento de la aplicación sea el mismo, tanto en móvil como en escritorio.
## Código Javascript
## Apartado Gráfico
