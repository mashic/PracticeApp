import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { User, LoginRequest, AuthResponse } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private storage = inject(StorageService);
  private router = inject(Router);

  private currentUserSignal = signal<User | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => {
        this.storage.set('accessToken', response.accessToken);
        this.storage.set('refreshToken', response.refreshToken);
        this.currentUserSignal.set(response.user);
      })
    );
  }

  logout(): void {
    this.storage.remove('accessToken');
    this.storage.remove('refreshToken');
    this.currentUserSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string | null {
    return this.storage.get('accessToken');
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.storage.get('refreshToken');
    return this.api.post<AuthResponse>('/auth/refresh', { refreshToken }).pipe(
      tap(response => {
        this.storage.set('accessToken', response.accessToken);
        this.storage.set('refreshToken', response.refreshToken);
      })
    );
  }

  hasRole(role: string): boolean {
    return this.currentUserSignal()?.role === role;
  }
}
