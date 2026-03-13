export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  duration: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  notes?: string;
  createdAt: string;
}

export interface CreateAppointmentRequest {
  doctorId: number;
  appointmentDate: string;
  duration: number;
  notes?: string;
}
