import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Sign In</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email" placeholder="you@example.com" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password" placeholder="••••••••" />
          </div>
          @if (error) {
            <p class="error-msg">{{ error }}</p>
          }
          <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        <p class="auth-footer">Don't have an account? <a routerLink="/register">Register</a></p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container { display: flex; justify-content: center; align-items: center; min-height: 70vh; }
      .auth-card { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 32px; width: 100%; max-width: 400px; }
      h2 { margin-bottom: 24px; }
      .form-group { margin-bottom: 16px; label { display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500; } input { width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px; font-size: 14px; } }
      .error-msg { color: var(--danger-color); font-size: 14px; margin-bottom: 12px; }
      .btn { width: 100%; padding: 10px; background: var(--primary-color); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 15px; }
      .auth-footer { margin-top: 16px; text-align: center; font-size: 14px; }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err?.error?.message ?? 'Login failed. Please try again.';
        this.loading = false;
      },
    });
  }
}
