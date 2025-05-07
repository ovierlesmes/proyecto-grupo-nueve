import { useEffect, useState } from 'react';
import { crearCita, obtenerCitas, cancelarCita, editarCita, eliminarCitaCancelada } from '../utils/api';
import { Cita, NuevaCita } from '../types';

const PanelUsuario = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [formData, setFormData] = useState<NuevaCita>({
    fecha: '',
    hora: '',
    nombrePerro: '',
    nombreDuenio: '',
    descripcion: '',
    sintomas: ''
  });
  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    const data = await obtenerCitas();
    setCitas(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId) {
      await editarCita(editandoId, formData);
      setEditandoId(null);
    } else {
      await crearCita(formData);
    }
    setFormData({ fecha: '', hora: '', nombrePerro: '', nombreDuenio: '', descripcion: '', sintomas: '' });
    fetchCitas();
  };

  const handleCancelar = async (id: string) => {
    await cancelarCita(id);
    fetchCitas();
  };

  const handleEditar = (cita: Cita) => {
    setFormData({
      fecha: cita.fecha,
      hora: cita.hora,
      nombrePerro: cita.nombrePerro,
      nombreDuenio: cita.nombreDuenio,
      descripcion: cita.descripcion || '',
      sintomas: cita.sintomas || ''
    });
    setEditandoId(cita.id);
  };

  const handleEliminarCancelada = async (id: string) => {
    await eliminarCitaCancelada(id);
    fetchCitas();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Panel de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input type="date" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} required />
        <input type="time" value={formData.hora} onChange={(e) => setFormData({ ...formData, hora: e.target.value })} required />
        <input type="text" placeholder="Nombre del perro" value={formData.nombrePerro} onChange={(e) => setFormData({ ...formData, nombrePerro: e.target.value })} required />
        <input type="text" placeholder="Nombre del dueño" value={formData.nombreDuenio} onChange={(e) => setFormData({ ...formData, nombreDuenio: e.target.value })} required />
        <input type="text" placeholder="Síntomas" value={formData.sintomas} onChange={(e) => setFormData({ ...formData, sintomas: e.target.value })} required />
        <input type= "text#" placeholder="Descripción (opcional)" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editandoId ? 'Actualizar Cita' : 'Agendar Cita'}</button>
      </form>

      <ul>
        {citas.map((cita) => (
          <li key={cita.id} className="mb-2 border p-2 rounded">
            {cita.fecha} {cita.hora} - {cita.nombrePerro} ({cita.nombreDuenio})<br />
            Estado: {cita.estado}<br />
            Síntomas: {cita.sintomas || 'Ninguno'}

            {cita.estado === 'Pendiente' && (
              <>
                <button onClick={() => handleCancelar(cita.id)} className="ml-2 text-red-500">Cancelar</button>
                <button onClick={() => handleEditar(cita)} className="ml-2 text-blue-500">Editar</button>
              </>
            )}

            {cita.estado === 'Cancelada' && (
              <button onClick={() => handleEliminarCancelada(cita.id)} className="ml-2 text-gray-600">Eliminar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelUsuario;
