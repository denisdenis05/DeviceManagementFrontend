import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConstants } from '../constants/application.constants';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public constructor(private readonly httpClient: HttpClient) {}

  public searchDevices(query: string): Observable<Device[]> {
    const requestUrl = `${ApplicationConstants.ApiBaseUrl}${ApplicationConstants.Endpoints.Search.DeviceSearch}`;
    const httpParameters = new HttpParams().set('Query', query);
    
    return this.httpClient.get<Device[]>(requestUrl, { params: httpParameters });
  }
}
