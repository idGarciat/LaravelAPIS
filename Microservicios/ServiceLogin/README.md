# ServiceLogin

Servicio REST para autenticar pacientes o administradores mediante JWT.

## Características

- `POST /auth/login`
- Emite token JWT válido
- Consulta usuarios del monolito por API o por MySQL directo
- Protege rutas con `Authorization: Bearer <token>`

## Instalación

```bash
npm install
```

## Configuración

Copia `.env.example` a `.env` y ajusta las variables.

### Modo API

- `AUTH_MODE=api`
- `MONOLITH_LOGIN_USERS_URL`
- `MONOLITH_LOGIN_PATIENTS_URL`
- `API_TOKEN` si el monolito exige autenticación

### Modo MySQL

- `AUTH_MODE=mysql`
- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

## Ejecutar

```bash
npm start
```

## Probar

```bash
npm test
```

## Ejemplo de login

```bash
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@example.com","password":"admin123"}'
```
