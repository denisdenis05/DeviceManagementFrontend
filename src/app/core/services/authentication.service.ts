import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { AuthenticationResponse } from '../models/authentication-response.model';
import { ApplicationConstants } from '../constants/application.constants';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenStorageService: TokenStorageService
  ) {}

  public login(request: LoginRequest): Observable<AuthenticationResponse> {
    const url = `${ApplicationConstants.ApiBaseUrl}${ApplicationConstants.Endpoints.Authentication.Login}`;
    return this.httpClient.post<AuthenticationResponse>(url, request).pipe(
      tap((response: AuthenticationResponse) => {
        if (response && response.token) {
          this.tokenStorageService.saveToken(response.token);
        }
      })
    );
  }

  public register(request: RegisterRequest): Observable<AuthenticationResponse> {
    const url = `${ApplicationConstants.ApiBaseUrl}${ApplicationConstants.Endpoints.Authentication.Register}`;
    return this.httpClient.post<AuthenticationResponse>(url, request).pipe(
      tap((response: AuthenticationResponse) => {
        if (response && response.token) {
          this.tokenStorageService.saveToken(response.token);
        }
      })
    );
  }

  public logout(): void {
    this.tokenStorageService.removeToken();
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorageService.getToken();
    return token !== null && token.length > 0;
  }
}
