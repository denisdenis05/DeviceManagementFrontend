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
    this.deviceService.retrieveAllDevices().subscribe({
      next: (devices: Device[]) => {
        this.devicesList = devices;
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
  }

  public navigateToDetail(identifier: string): void {
    const detailRoute = '/' + ApplicationConstants.Routes.DeviceDetail.replace(':identifier', identifier);
    this.router.navigate([detailRoute]);
  }
}
