const express = require('express');

const ALLOWED_STATUS = new Set(['programada', 'atendida', 'cancelada']);

function validateCreatePayload(body) {
  const requiredFields = ['medico_id', 'paciente_id', 'fecha_cita', 'hora_cita', 'estado', 'costo'];
  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      throw Object.assign(new Error(`El campo ${field} es obligatorio`), { status: 400 });
    }
  }

  validateCommonRules(body);
}

function validateUpdatePayload(body) {
  validateCommonRules(body);
}

function validateCommonRules(body) {
  if (body.estado !== undefined && !ALLOWED_STATUS.has(String(body.estado).toLowerCase())) {
    throw Object.assign(new Error('estado debe ser programada, atendida o cancelada'), { status: 400 });
  }

  if (body.costo !== undefined && (Number.isNaN(Number(body.costo)) || Number(body.costo) < 0)) {
    throw Object.assign(new Error('costo debe ser un número mayor o igual a 0'), { status: 400 });
  }

  if (body.fecha_cita !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(String(body.fecha_cita))) {
    throw Object.assign(new Error('fecha_cita debe tener formato YYYY-MM-DD'), { status: 400 });
  }

  if (body.hora_cita !== undefined && !/^\d{2}:\d{2}$/.test(String(body.hora_cita))) {
    throw Object.assign(new Error('hora_cita debe tener formato HH:MM'), { status: 400 });
  }
}

function createCitasRouter({ repository }) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const citas = await repository.list(req.query);
      return res.json(citas);
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const cita = await repository.getById(req.params.id);
      if (!cita) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }

      return res.json(cita);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      validateCreatePayload(req.body || {});
      const cita = await repository.create(req.body || {});
      return res.status(201).json(cita);
    } catch (error) {
      return next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      validateUpdatePayload(req.body || {});
      const cita = await repository.update(req.params.id, req.body || {});
      if (!cita) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }

      return res.json(cita);
    } catch (error) {
      return next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const cita = await repository.delete(req.params.id);
      if (!cita) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createCitasRouter };
