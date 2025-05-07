export interface Cita {
  id: string;
  fecha: string;
  hora: string;
  nombrePerro: string;
  nombreDuenio: string;
  descripcion?: string;
  sintomas?: string;
  estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
}

export interface NuevaCita {
  fecha: string;
  hora: string;
  nombrePerro: string;
  nombreDuenio: string;
  descripcion?: string;
  sintomas?: string;
}
