<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p> Este proyecto está hecho en Nest, para una prueba técnica.  </p>

La base de datos está contenida en docker y para ejecutar el proyecto sigue los siguientes pasos:
## 1. Renombre el archivo env.example por .env. Las variables están confirmadas para correr con el contenedor de docker

## 2. Ejecuta el siguiente comando para ejecutar la base de datos.

```bash
$ docker-compose up -d
```

## 3. Ejecuta el siguiente comando para instalar las dependencias.

```bash
$ yarn install
```

## 4. Ejecuta el siguiente comando para ejecutar la aplicación.

```bash
$ yarn run start
```
## 5. Cuando la aplicación se esté ejecutando, visitar la siguiente Url para ejecutar los Seed

```bash
http://localhost:3000/api/seed
```

## Usuarios

```bash
User: usuario1@email.com
Pass: Abc123
```
## Docmunetacion

```bash
http://localhost:3000/api
```