import { Injectable } from '@angular/core';
import { ApplicationConstants } from '../constants/application.constants';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public saveToken(token: string): void {
    window.localStorage.setItem(ApplicationConstants.StorageKeys.AuthenticationToken, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(ApplicationConstants.StorageKeys.AuthenticationToken);
  }

  public removeToken(): void {
    window.localStorage.removeItem(ApplicationConstants.StorageKeys.AuthenticationToken);
  }
}
