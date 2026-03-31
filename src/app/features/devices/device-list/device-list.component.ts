import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../core/models/device.model';
import { ApplicationConstants } from '../../../core/constants/application.constants';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
  public devicesList: Device[] = [];
  
  public constructor(
    private readonly deviceService: DeviceService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.fetchDeviceOverview();
  }

  private fetchDeviceOverview(): void {
    this.deviceService.retrieveAllDevices().subscribe({
      next: (devices: Device[]) => {
        this.devicesList = devices;
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
  }

  public navigateToCreate(): void {
    const createRoute = '/' + ApplicationConstants.Routes.DeviceCreate;
    this.router.navigate([createRoute]);
  }

  public navigateToEdit(identifier: string): void {
    const editRoute = '/' + ApplicationConstants.Routes.DeviceEdit.replace(':identifier', identifier);
    this.router.navigate([editRoute]);
  }

  public navigateToDetail(identifier: string): void {
    const detailRoute = '/' + ApplicationConstants.Routes.DeviceDetail.replace(':identifier', identifier);
    this.router.navigate([detailRoute]);
  }

  public removeDevice(identifier: string): void {
    this.deviceService.deleteDevice(identifier).subscribe({
      next: () => {
        this.fetchDeviceOverview();
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
  }
}
