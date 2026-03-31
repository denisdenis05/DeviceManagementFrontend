import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Device } from '../../../core/models/device.model';
import { ApplicationConstants } from '../../../core/constants/application.constants';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent implements OnInit {
  public deviceDetail: Device | undefined;
  public currentUserId: string | null = null;
  public applicationConstants = ApplicationConstants;
  
  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly deviceService: DeviceService,
    private readonly authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.currentUserId = this.authenticationService.getCurrentUserIdentifier();
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
