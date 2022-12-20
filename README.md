## Rutas o endpoints de la API

### Usuarios

```
GET      /alluser // traer todos los usuarios
GET      /user/:id // traer un usuario por id
POST     /register // registrar un usuario
PUT      /user/:id // editar un usuario
DELETE   /user/:id // eliminar un usuario
```

### Menu

```
GET      /menu // traer todos los productos
GET      /menu/:id // traer un menu por id
POST     /register // registrar un usuario
PUT      /menu/:id // editar un menu
DELETE   /menu/:id // eliminar un menu
PATCH    /menu/:id // editar el estado de un menu
PATCH    /menu/sugerido/:id // poner un menu como sugerido
```

### Pedidos

```
GET      /pedido // traer todos los pedidos
GET      /pedido/:id // traer un pedido por id
POST     /pedido // crear un pedido
PUT      /pedido/:id // editar un pedido
DELETE   /pedido/:id // eliminar un pedido
PATCH    /pedido/:id // editar el estado de un pedido
```

### Categorias

```
GET      /categorias // traer todos los categorias
GET      /categoria/:id // traer una categoria por id
POST     /categoria // crear una categoria
PUT      /categoria/:id // editar una categoria
DELETE   /categoria/:id // eliminar una categoria
```
