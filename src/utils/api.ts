import axios from 'axios';
import { NuevaCita } from '../types';

const API_URL = 'http://localhost:5000/api';

// Obtener todas las citas
export const obtenerCitas = async () => {
  const res = await axios.get(`${API_URL}/citas`);
  return res.data;
};

// Crear una nueva cita
export const crearCita = async (cita: NuevaCita) => {
  const res = await axios.post(`${API_URL}/citas`, cita);
  return res.data;
};

// Cancelar una cita (solo cambia el estado a 'Cancelada')
export const cancelarCita = async (id: string) => {
  await axios.delete(`${API_URL}/citas/${id}`);
};

// Confirmar una cita (cambia el estado a 'Confirmada')
export const confirmarCita = async (id: string) => {
  await axios.post(`${API_URL}/confirmar-cita/${id}`);
};

// Editar una cita (fecha, hora, perro, dueño, descripcion, sintomas)
export const editarCita = async (id: string, cita: NuevaCita) => {
  const res = await axios.put(`${API_URL}/editar-cita/${id}`, cita);
  return res.data;
};

// Eliminar permanentemente una cita cancelada
export const eliminarCitaCancelada = async (id: string) => {
  await axios.delete(`${API_URL}/citas/cancelada/${id}`);
};
