import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Appointment, CreateAppointmentRequest } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly API_URL = `${environment.apiBaseUrl}/appointments`;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.API_URL);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.API_URL}/${id}`);
  }

  createAppointment(data: CreateAppointmentRequest): Observable<Appointment> {
    return this.http.post<Appointment>(this.API_URL, data);
  }

  cancelAppointment(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/cancel`, {});
  }
}
