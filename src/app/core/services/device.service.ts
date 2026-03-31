import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';
import { ApplicationConstants } from '../constants/application.constants';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public constructor(private readonly httpClient: HttpClient) {}

  public retrieveAllDevices(): Observable<Device[]> {
    const requestUrl = `${ApplicationConstants.ApiBaseUrl}${ApplicationConstants.Endpoints.GetAllDevices}`;
    return this.httpClient.get<Device[]>(requestUrl);
  }

  public retrieveDeviceByIdentifier(identifier: string): Observable<Device> {
    const requestUrl = `${ApplicationConstants.ApiBaseUrl}${ApplicationConstants.Endpoints.GetDevice}?identifier=${identifier}`;
    return this.httpClient.get<Device>(requestUrl);
  }
}
