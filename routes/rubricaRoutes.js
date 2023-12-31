const express = require('express');
const router = express.Router();
const Rubrica = require('../models/Rubrica');

/**
 * @swagger
 * tags:
 *   name: Rubrica
 *   description: Operaciones de rubricas de evaluación
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rubrica:
 *       type: object
 *       properties:
 *         idUsuario:
 *           type: string
 *           description: ID del usuario propietario de la rubrica
 *         nombreUsuario:
 *           type: string
 *           description: Nombre del usuario propietario de la rubrica
 *         rubricas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RubricaDetalle'
 *
 *     RubricaDetalle:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: ID de la rubrica
 *         nombre:
 *           type: string
 *           description: Nombre de la rubrica
 *         curso:
 *           type: string
 *           description: Curso al que pertenece la rubrica
 *         carrera:
 *           type: string
 *           description: Carrera a la que pertenece la rubrica
 *         categorias:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Categoria'
 *
 *     Categoria:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría
 *         criterios:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Criterio'
 *
 *     Criterio:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del criterio
 *         descriptores:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Descriptor'
 *
 *     Descriptor:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del descriptor
 *         puntaje:
 *           type: number
 *           description: Puntaje asignado al descriptor
 */

/**
 * @swagger
 * /api/rubrica:
 *   get:
 *     summary: Obtener todas las rubricas
 *     tags: [Rubrica]
 *     responses:
 *       200:
 *         description: Lista de rubricas obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const rubricas = await Rubrica.find();
    res.status(200).json(rubricas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/rubrica:
 *   post:
 *     summary: Crear una nueva rubrica
 *     tags: [Rubrica]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rubrica'
 *     responses:
 *       201:
 *         description: Rubrica creada con éxito
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error del servidor
 */
router.post('/', async (req, res) => {
  try {
    const nuevaRubrica = new Rubrica(req.body);
    await nuevaRubrica.save();
    res.status(201).json({ message: 'Rubrica creada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/rubrica/{rubricaId}:
 *   get:
 *     summary: Obtener una rubrica por ID
 *     tags: [Rubrica]
 *     parameters:
 *       - in: path
 *         name: rubricaId
 *         required: true
 *         description: ID de la rubrica a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rubrica obtenida con éxito
 *       404:
 *         description: Rubrica no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:rubricaId', async (req, res) => {
  try {
    const rubrica = await Rubrica.findById(req.params.rubricaId);
    if (rubrica) {
      res.status(200).json(rubrica);
    } else {
      res.status(404).json({ error: 'Rubrica no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/rubrica/{rubricaId}:
 *   put:
 *     summary: Actualizar una rubrica por ID
 *     tags: [Rubrica]
 *     parameters:
 *       - in: path
 *         name: rubricaId
 *         required: true
 *         description: ID de la rubrica a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rubrica'
 *     responses:
 *       200:
 *         description: Rubrica actualizada con éxito
 *       404:
 *         description: Rubrica no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:rubricaId', async (req, res) => {
  try {
    const rubricaActualizada = await Rubrica.findByIdAndUpdate(
      req.params.rubricaId,
      req.body,
      { new: true }
    );

    if (rubricaActualizada) {
      res.status(200).json({ message: 'Rubrica actualizada con éxito' });
    } else {
      res.status(404).json({ error: 'Rubrica no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/rubrica/{rubricaId}:
 *   delete:
 *     summary: Eliminar una rubrica por ID
 *     tags: [Rubrica]
 *     parameters:
 *       - in: path
 *         name: rubricaId
 *         required: true
 *         description: ID de la rubrica a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rubrica eliminada con éxito
 *       404:
 *         description: Rubrica no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:rubricaId', async (req, res) => {
  try {
    const rubricaEliminada = await Rubrica.findByIdAndDelete(
      req.params.rubricaId
    );

    if (rubricaEliminada) {
      res.status(200).json({ message: 'Rubrica eliminada con éxito' });
    } else {
      res.status(404).json({ error: 'Rubrica no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;


// ... Código anterior ...
//APIS DE CREAR ACTUALIZAR VER Y ELIMINAR RUBRICA EN EL DOCUMENTO


//Manipular un atributo
/**
 * @swagger
 * /api/rubrica/{rubricaId}/rubricas:
 *   post:
 *     summary: Agregar una nueva rubrica al arreglo de rubricas
 *     tags: [Rubrica]
 *     parameters:
 *       - in: path
 *         name: rubricaId
 *         required: true
 *         description: ID de la rubrica principal
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RubricaDetalle'
 *     responses:
 *       201:
 *         description: Rubrica añadida con éxito al arreglo
 *       404:
 *         description: Rubrica principal no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/:rubricaId/rubricas', async (req, res) => {
  try {
    const rubricaPrincipal = await Rubrica.findById(req.params.rubricaId);
    if (!rubricaPrincipal) {
      return res.status(404).json({ error: 'Rubrica principal no encontrada' });
    }

    rubricaPrincipal.rubricas.push(req.body);
    await rubricaPrincipal.save();

    res.status(201).json({ message: 'Rubrica añadida con éxito al arreglo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/rubrica/{rubricaId}/rubricas/{rubricaDetalleId}:
 *   put:
 *     summary: Actualizar una rubrica en el arreglo de rubricas
 *     tags: [Rubrica]
 *     parameters:
 *       - in: path
 *         name: rubricaId
 *         required: true
 *         description: ID de la rubrica principal
 *         schema:
 *           type: string
 *       - in: path
 *         name: rubricaDetalleId
 *         required: true
 *         description: ID de la rubrica a actualizar
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RubricaDetalle'
 *     responses:
 *       200:
 *         description: Rubrica actualizada con éxito en el arreglo
 *       404:
 *         description: Rubrica principal o detalle no encontrados
 *       500:
 *         description: Error del servidor
 */
router.put('/:rubricaId/rubricas/:rubricaDetalleId', async (req, res) => {
  try {
    const rubricaPrincipal = await Rubrica.findById(req.params.rubricaId);
    if (!rubricaPrincipal) {
      return res.status(404).json({ error: 'Rubrica principal no encontrada' });
    }

    const rubricaDetalle = rubricaPrincipal.rubricas.id(req.params.rubricaDetalleId);
    if (!rubricaDetalle) {
      return res.status(404).json({ error: 'Rubrica detalle no encontrada' });
    }

    rubricaDetalle.set(req.body);
    await rubricaPrincipal.save();

    res.status(200).json({ message: 'Rubrica actualizada con éxito en el arreglo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/rubrica/{rubricaId}/rubricas/{rubricaDetalleId}:
 *   delete:
 *     summary: Eliminar una rubrica del arreglo de rubricas
 *     tags: [Rubrica]
 *     parameters:
 *       - in: path
 *         name: rubricaId
 *         required: true
 *         description: ID de la rubrica principal
 *         schema:
 *           type: string
 *       - in: path
 *         name: rubricaDetalleId
 *         required: true
 *         description: ID de la rubrica a eliminar
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Rubrica eliminada con éxito del arreglo
 *       404:
 *         description: Rubrica principal o detalle no encontrados
 *       500:
 *         description: Error del servidor
 */
router.delete('/:rubricaId/rubricas/:rubricaDetalleId', async (req, res) => {
  try {
    const rubricaPrincipal = await Rubrica.findById(req.params.rubricaId);
    if (!rubricaPrincipal) {
      return res.status(404).json({ error: 'Rubrica principal no encontrada' });
    }

    const rubricaDetalle = rubricaPrincipal.rubricas.id(req.params.rubricaDetalleId);
    if (!rubricaDetalle) {
      return res.status(404).json({ error: 'Rubrica detalle no encontrada' });
    }

    rubricaDetalle.remove();
    await rubricaPrincipal.save();

    res.status(200).json({ message: 'Rubrica eliminada con éxito del arreglo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ... Código posterior ...
