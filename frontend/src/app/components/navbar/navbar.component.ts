import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a routerLink="/">🩺 Veda Voice</a>
      </div>
      <div class="navbar-links">
        @if (authService.isAuthenticated()) {
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/voice">Voice</a>
          <a routerLink="/appointments">Appointments</a>
          <a routerLink="/health-records">Records</a>
          <button (click)="authService.logout()">Logout</button>
        } @else {
          <a routerLink="/login">Login</a>
          <a routerLink="/register">Register</a>
        }
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
        padding: 0 24px;
        background-color: var(--surface-color);
        border-bottom: 1px solid var(--border-color);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
      }
      .navbar-brand a {
        font-size: 20px;
        font-weight: 700;
        color: var(--primary-color);
        text-decoration: none;
      }
      .navbar-links {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .navbar-links a {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
        text-decoration: none;
        &:hover { color: var(--primary-color); }
      }
      button {
        padding: 6px 14px;
        background: var(--primary-color);
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
    `,
  ],
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
