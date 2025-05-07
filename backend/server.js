const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let citas = [];

app.get('/api/citas', (req, res) => {
  res.json(citas);
});

app.post('/api/citas', (req, res) => {
  const nuevaCita = { id: uuidv4(), estado: 'Pendiente', ...req.body };
  citas.push(nuevaCita);
  res.status(201).json(nuevaCita);
});

app.delete('/api/citas/:id', (req, res) => {
  const cita = citas.find(c => c.id === req.params.id);
  if (!cita) return res.status(404).json({ message: 'No encontrada' });

  cita.estado = 'Cancelada';
  res.status(200).json({ message: 'Cita cancelada' });
});

app.post('/api/confirmar-cita/:id', (req, res) => {
  const cita = citas.find(c => c.id === req.params.id);
  if (!cita) return res.status(404).json({ message: 'No encontrada' });

  cita.estado = 'Confirmada';
  res.status(200).json({ message: 'Cita confirmada' });
});

app.put('/api/editar-cita/:id', (req, res) => {
  const cita = citas.find(c => c.id === req.params.id);
  if (!cita) return res.status(404).json({ message: 'No encontrada' });

  Object.assign(cita, req.body);
  res.status(200).json({ message: 'Cita actualizada' });
});

app.delete('/api/citas/cancelada/:id', (req, res) => {
  const index = citas.findIndex(c => c.id === req.params.id && c.estado === 'Cancelada');
  if (index === -1) return res.status(404).json({ message: 'No encontrada o no cancelada' });

  citas.splice(index, 1);
  res.status(200).json({ message: 'Cita eliminada permanentemente' });
});

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
