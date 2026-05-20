const express = require('express');

function buildMedicoPayload(body) {
  return {
    nombre_completo: body.nombre_completo,
    especialidad_id: body.especialidad_id,
    especialidad_nombre: body.especialidad_nombre,
    telefono: body.telefono,
    email: body.email,
    estado: body.estado,
  };
}

function createMedicosRouter({ repository, authenticate }) {
  const router = express.Router();

  router.use(authenticate);

  router.get('/', async (req, res, next) => {
    try {
      const medicos = await repository.list(req.query, req.headers.authorization || '');
      return res.json(medicos);
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const medico = await repository.getById(req.params.id, req.headers.authorization || '');
      if (!medico) {
        return res.status(404).json({ message: 'Médico no encontrado' });
      }

      return res.json(medico);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const payload = buildMedicoPayload(req.body || {});
      if (!payload.nombre_completo || !payload.especialidad_id || !payload.estado) {
        return res.status(400).json({ message: 'nombre_completo, especialidad_id y estado son obligatorios' });
      }

      const medico = await repository.create(payload, req.headers.authorization || '');
      return res.status(201).json(medico);
    } catch (error) {
      return next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const payload = buildMedicoPayload(req.body || {});
      const medico = await repository.update(req.params.id, payload, req.headers.authorization || '');
      if (!medico) {
        return res.status(404).json({ message: 'Médico no encontrado' });
      }

      return res.json(medico);
    } catch (error) {
      return next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const medico = await repository.delete(req.params.id, req.headers.authorization || '');
      if (!medico) {
        return res.status(404).json({ message: 'Médico no encontrado' });
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createMedicosRouter };
