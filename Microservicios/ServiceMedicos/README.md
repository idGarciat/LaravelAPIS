# ServiceMedicos

Servicio REST para administrar médicos con autenticación JWT.

## Características

- `GET /medicos`
- `GET /medicos/:id`
- `POST /medicos`
- `PUT /medicos/:id`
- `DELETE /medicos/:id`
- `POST /auth/login` para obtener un JWT
- Protección de rutas con `Authorization: Bearer <token>`
- Persistencia local en `data/medicos.json`
- Opción de proxy a un monolito mediante `MONOLITH_MEDICOS_URL`

## Instalación

```bash
npm install
```

## Configuración

Copia `.env.example` a `.env` y ajusta los valores.

Variables principales:

- `PORT`
- `JWT_SECRET`
- `API_USER`
- `API_PASSWORD`
- `DATA_FILE`
- `MONOLITH_MEDICOS_URL`
- `MONOLITH_AUTH_TOKEN`

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
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Ejemplo de consumo de médicos

```bash
curl http://localhost:3001/medicos \
  -H "Authorization: Bearer TU_TOKEN"
```
