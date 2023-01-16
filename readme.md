# Test - ionix
Aplicación que entrega la solución a la problemática dada por la compañía

## Stack utilizado
 - Node v18.14.0
 - Postgresql v14.1
 - Docker
 - Docker-compose
 - Jest + supertest

## Pre requisitos para levantar el proyecto
 - Instalar docker-compose en el ordenador que se utilizara
 - Cargar .env en la carpeta raíz del proyecto descargado
 -- Cargar .env con variables. [para este caso entregados en el siguiente [link](https://docs.google.com/document/d/1YMjCWFwbf8o7PTB7nbZgFqg1QsQOE07aPu90oph0294/edit?usp=sharing)]

## Levantar aplicación de forma local
 - Clonar el repositorio del proyecto
 - Posicionarse dentro de la carpeta
 -- Si es por consola entrar a la carpeta de la consola a través de ella.
 -- Si es por Vscode abrir un nuevo terminal
 - Escribir el comando 
 -- `docker-compose up --build`
 - Verificar que el proyecto esté corriendo en el puerto señalado

## Correr Test
- Entrar a la máquina del contenedor con el comando
     -- `docker exec ionix_app_1 -it sh`
- Una vez dentro del contenedor correr el siguiente comando para que se vean correr los test
-- `npm run test`

[POSTMAN COLLECTIONS](https://drive.google.com/file/d/15KxNjpcH9siM7R-rD16TYEMTd627fJ9d/view?usp=sharing)]
