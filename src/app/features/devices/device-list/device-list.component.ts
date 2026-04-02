import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DeviceService } from '../../../core/services/device.service';
import { SearchService } from '../../../core/services/search.service';
import { Device } from '../../../core/models/device.model';
import { ApplicationConstants } from '../../../core/constants/application.constants';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ChatToggleService } from '../../../core/services/chat-toggle.service';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
  public devicesList: Device[] = [];
  public currentUserId: string | null = null;
  public searchQuery: string = '';
  
  private searchSubject = new Subject<string>();
  
  public constructor(
    private readonly deviceService: DeviceService,
    private readonly searchService: SearchService,
    private readonly authenticationService: AuthenticationService,
    private readonly chatToggleService: ChatToggleService,
    private readonly router: Router
  ) {}

  public onSearchQueryChange(query: string): void {
    this.searchSubject.next(query);
  }

  public openAiAssistant(): void {
    this.chatToggleService.openChat();
  }

  public ngOnInit(): void {
    this.currentUserId = this.authenticationService.getCurrentUserIdentifier();
    this.fetchDeviceOverview();
    this.initializeSearchSubscription();
  }

  private initializeSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query.trim()) {
          return this.deviceService.retrieveAllDevices();
        }
        return this.searchService.searchDevices(query);
      })
    ).subscribe({
      next: (devices: Device[]) => {
        this.devicesList = devices;
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
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
