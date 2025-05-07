import { useEffect, useState } from 'react';
import { obtenerCitas, confirmarCita, cancelarCita } from '../utils/api';
import { Cita } from '../types';

const PanelVeterinario = () => {
  const [citas, setCitas] = useState<Cita[]>([]);  // Definir el tipo de las citas
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    setLoading(true);
    const data = await obtenerCitas();
    setCitas(data);
    setLoading(false);
  };

  const handleConfirmar = async (id: string) => {
    await confirmarCita(id);
    fetchCitas();
  };

  const handleCancelar = async (id: string) => {
    await cancelarCita(id);
    fetchCitas();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Panel del Veterinario</h2>

      {loading ? (
        <p>Cargando citas...</p>
      ) : (
        <ul>
          {citas.map((cita) => (
            <li key={cita.id} className="mb-2 border p-2 rounded">
              {cita.fecha} {cita.hora} - {cita.nombrePerro} ({cita.nombreDuenio}) - Estado: {cita.estado}
              {cita.estado === 'Pendiente' && (
                <div>
                  <button onClick={() => handleConfirmar(cita.id)} className="mr-2 text-green-500">Confirmar</button>
                  <button onClick={() => handleCancelar(cita.id)} className="text-red-500">Cancelar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelVeterinario;
