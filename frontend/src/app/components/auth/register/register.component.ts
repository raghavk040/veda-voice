import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Create Account</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" formControlName="firstName" placeholder="John" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" formControlName="lastName" placeholder="Doe" />
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="you@example.com" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" placeholder="••••••••" />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select formControlName="role">
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
          </div>
          @if (error) {
            <p class="error-msg">{{ error }}</p>
          }
          <button type="submit" class="btn" [disabled]="registerForm.invalid || loading">
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>
        <p class="auth-footer">Already have an account? <a routerLink="/login">Sign In</a></p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container { display: flex; justify-content: center; align-items: center; min-height: 70vh; }
      .auth-card { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 32px; width: 100%; max-width: 480px; }
      h2 { margin-bottom: 24px; }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .form-group { margin-bottom: 16px; label { display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500; } input, select { width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px; font-size: 14px; } }
      .error-msg { color: var(--danger-color); font-size: 14px; margin-bottom: 12px; }
      .btn { width: 100%; padding: 10px; background: var(--primary-color); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 15px; }
      .auth-footer { margin-top: 16px; text-align: center; font-size: 14px; }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['PATIENT', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.authService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err?.error?.message ?? 'Registration failed. Please try again.';
        this.loading = false;
      },
    });
  }
}
