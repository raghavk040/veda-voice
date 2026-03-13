import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-500/10 p-8">
      <div class="text-center max-w-2xl">
        <h1 class="text-5xl font-bold text-primary-700 mb-4">🩺 Veda Voice</h1>
        <p class="text-xl text-slate-600 mb-8">AI-Powered Healthcare Assistant</p>
        <p class="text-slate-500">
          Your intelligent healthcare companion powered by Angular 17, Spring Boot 3, and FastAPI.
        </p>
      </div>
    </div>
  `
})
export class HomeComponent {}
