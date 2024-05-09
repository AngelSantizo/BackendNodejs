# Backend con Node y Express
En este repositorio encontraràn metodos de **GET, POST Y DELETE** los cuales agregaremos distintas tareas y metas de nuestro proyecto y podremos hacer modificaciones y consultas de la misma sin embargo los datos aun no persistiràn ya que no esta conectada aùn con una base de datos pero nos permite visualizar la funcionalidad de esta.

## EndPoints
Aqui encontraremos algunos endpoints pero los cuales nos interesa son _/tasks y /goals_ los cuales tambien seran verificados mediante un **middleware** y este se encargara pasar por cada uno de los endpoints y cuando intentemos hacer uso de los metodos HTTP tendran que ser verificados por un APIKey la cual pasara por los headers y verificar el athorization si hace match con el key ingresado dentro de postman y asi acceder al contenido o modificarlo
