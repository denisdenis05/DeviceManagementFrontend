import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../core/models/device.model';
import { ApplicationConstants } from '../../../core/constants/application.constants';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
  public devicesList: Device[] = [];
  public currentUserId: string | null = null;
  
  public constructor(
    private readonly deviceService: DeviceService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.currentUserId = this.authenticationService.getCurrentUserIdentifier();
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

  public assignDevice(identifier: string): void {
    this.deviceService.assignDevice(identifier).subscribe({
      next: () => {
        this.fetchDeviceOverview();
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
  }

  public unassignDevice(identifier: string): void {
    this.deviceService.unassignDevice(identifier).subscribe({
      next: () => {
        this.fetchDeviceOverview();
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
  }
}
