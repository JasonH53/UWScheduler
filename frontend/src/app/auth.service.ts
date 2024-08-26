import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface AuthResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => this.setSession(response))
      );
  }

  register(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { username, password })
      .pipe(
        tap(response => this.setSession(response)),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(error);
        })
      );
  }

  private getLocalStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }
    return null;
  }

  private setSession(authResult: AuthResponse) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  isLoggedIn(): boolean {
    const storage = this.getLocalStorage();
    return storage ? !!storage.getItem('token') : false;
  }

  setToken(token: string): void {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.setItem('token', token);
    }
  }
  
  getToken(): string | null {
    const storage = this.getLocalStorage();
    return storage ? storage.getItem('token') : null;
  }
  
  logout(): void {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.removeItem('token');
    }
  }
}