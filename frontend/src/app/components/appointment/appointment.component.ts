import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment',
  standalone: true,
  template: `
    <div class="appointments">
      <h2>My Appointments</h2>
      @if (appointments.length === 0) {
        <p class="empty-state">No appointments scheduled.</p>
      } @else {
        <ul class="appointment-list">
          @for (appt of appointments; track appt.id) {
            <li class="appointment-item">
              <span class="appt-doctor">Dr. {{ appt.doctorName }}</span>
              <span class="appt-date">{{ appt.appointmentDate | date:'medium' }}</span>
              <span class="appt-status" [class]="'status-' + appt.status.toLowerCase()">{{ appt.status }}</span>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [
    `
      .appointments { max-width: 800px; margin: 0 auto; }
      .empty-state { color: var(--text-secondary); }
      .appointment-list { list-style: none; }
      .appointment-item {
        display: flex; align-items: center; gap: 16px;
        padding: 12px 16px; border: 1px solid var(--border-color);
        border-radius: 8px; margin-bottom: 8px;
        background: var(--surface-color);
      }
      .appt-doctor { font-weight: 500; flex: 1; }
      .appt-date { color: var(--text-secondary); font-size: 14px; }
      .status-scheduled { color: var(--primary-color); }
      .status-completed { color: var(--secondary-color); }
      .status-cancelled { color: var(--danger-color); }
    `,
  ],
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }
}
