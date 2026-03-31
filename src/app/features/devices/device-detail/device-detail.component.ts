import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../core/models/device.model';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent implements OnInit {
  public deviceDetail: Device | undefined;
  
  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly deviceService: DeviceService
  ) {}

  public ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('identifier');
    if (identifier) {
      this.deviceService.retrieveDeviceByIdentifier(identifier).subscribe({
        next: (device: Device) => {
          this.deviceDetail = device;
        },
        error: (error: Error) => {
          console.error(error.message);
        }
      });
    }
  }
}
