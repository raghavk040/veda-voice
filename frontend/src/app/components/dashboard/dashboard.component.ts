import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      @if (authService.currentUser()) {
        <p>Welcome, {{ authService.currentUser()?.firstName }}!</p>
      }
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Upcoming Appointments</h3>
          <span class="stat-value">0</span>
        </div>
        <div class="stat-card">
          <h3>Health Records</h3>
          <span class="stat-value">0</span>
        </div>
        <div class="stat-card">
          <h3>Voice Notes</h3>
          <span class="stat-value">0</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard { max-width: 900px; margin: 0 auto; }
      .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
      .stat-card { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; }
      .stat-value { font-size: 32px; font-weight: 700; color: var(--primary-color); }
    `,
  ],
})
export class DashboardComponent {
  constructor(public authService: AuthService) {}
}
