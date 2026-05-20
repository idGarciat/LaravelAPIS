# ServiceCitas

Servicio REST para gestionar citas médicas almacenadas en MongoDB.

## Campos

- `medico_id`: identificador del médico asignado
- `paciente_id`: identificador del paciente
- `fecha_cita`: fecha programada de la cita (`YYYY-MM-DD`)
- `hora_cita`: hora de la cita (`HH:MM`)
- `estado`: `programada`, `atendida` o `cancelada`
- `observaciones`: comentarios o diagnóstico
- `costo`: monto asociado a la consulta

## Endpoints

- `GET /citas`
- `GET /citas/:id`
- `POST /citas`
- `PUT /citas/:id`
- `DELETE /citas/:id`

## Instalación

```bash
npm install
```

## Configuración

Copia `.env.example` a `.env` y ajusta los valores.

## Ejecutar

```bash
npm start
```

## Probar

```bash
npm test
```
