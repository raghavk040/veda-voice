import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero">
      <h1>Welcome to Veda Voice</h1>
      <p>AI-powered healthcare assistant. Speak your symptoms, get instant insights.</p>
      <div class="cta-buttons">
        <a routerLink="/register" class="btn btn-primary">Get Started</a>
        <a routerLink="/login" class="btn btn-secondary">Sign In</a>
      </div>
    </div>
  `,
  styles: [
    `
      .hero {
        text-align: center;
        padding: 80px 24px;
        h1 { font-size: 36px; margin-bottom: 16px; }
        p { font-size: 18px; color: var(--text-secondary); margin-bottom: 32px; }
        .cta-buttons { display: flex; justify-content: center; gap: 12px; }
      }
    `,
  ],
})
export class HomeComponent {}
