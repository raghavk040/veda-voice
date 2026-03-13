import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  User,
  AuthToken,
  LoginRequest,
  RegisterRequest,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiBaseUrl}/auth`;
  private readonly TOKEN_KEY = 'veda_access_token';

  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.API_URL}/login`, credentials)
      .pipe(tap((token) => this.handleAuthSuccess(token)));
  }

  register(data: RegisterRequest): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.API_URL}/register`, data)
      .pipe(tap((token) => this.handleAuthSuccess(token)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private handleAuthSuccess(token: AuthToken): void {
    localStorage.setItem(this.TOKEN_KEY, token.accessToken);
    this.isAuthenticated.set(true);
    this.fetchCurrentUser().subscribe();
  }

  private fetchCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/me`)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    if (token) {
      this.isAuthenticated.set(true);
      this.fetchCurrentUser().subscribe({
        error: () => this.logout(),
      });
    }
  }
}
