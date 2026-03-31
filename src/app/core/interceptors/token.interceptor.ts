import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenStorageService = inject(TokenStorageService);
  const authenticationToken = tokenStorageService.getToken();

  if (authenticationToken) {
    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authenticationToken}`
      }
    });
    return next(authenticatedRequest);
  }

  return next(request);
};
