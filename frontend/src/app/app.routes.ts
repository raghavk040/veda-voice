import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'voice',
    loadComponent: () =>
      import('./components/voice-recorder/voice-recorder.component').then(
        (m) => m.VoiceRecorderComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./components/appointment/appointment.component').then(
        (m) => m.AppointmentComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'health-records',
    loadComponent: () =>
      import('./components/health-record/health-record.component').then(
        (m) => m.HealthRecordComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
