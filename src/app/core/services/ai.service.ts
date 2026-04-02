import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConstants } from '../constants/application.constants';

export interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  public constructor(private readonly httpClient: HttpClient) {}

  public chat(message: string): Observable<ChatResponse> {
    const requestUrl = `${ApplicationConstants.ApiBaseUrl}${ApplicationConstants.Endpoints.Ai.Chat}`;
    return this.httpClient.post<ChatResponse>(requestUrl, { message });
  }
}
