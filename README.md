# Nest Post Api - Authentication


## Pasos


### Crear el proyecto y dependencias
- npm i -g @nestjs/cli
- nest new post-api
- npm i --save @nestjs/typeorm typeorm oracledb
- npm install --save @nestjs/swagger
- npm i --save @nestjs/config


### Crear modulo de Autentication

- nest g module auth
- nest g controller auth
- nest g service auth

- nest g module users
- nest g service users