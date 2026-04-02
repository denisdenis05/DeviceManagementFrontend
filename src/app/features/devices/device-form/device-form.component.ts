import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, takeUntil } from 'rxjs/operators';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../core/models/device.model';
import { ApplicationConstants } from '../../../core/constants/application.constants';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.css'
})
export class DeviceFormComponent implements OnInit, OnDestroy {
  public deviceFormGroup: FormGroup;
  public isEditMode: boolean = false;
  public validationMessages = ApplicationConstants.ValidationMessages;
  public applicationConstants = ApplicationConstants;
  private readonly componentDestroyed$ = new Subject<void>();
  private currentDeviceIdentifier: string = '';

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly deviceService: DeviceService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.deviceFormGroup = this.formBuilder.group({
      name: ['', Validators.required, this.uniquenessValidator()],
      manufacturer: ['', Validators.required],
      type: ['', Validators.required],
      operatingSystem: ['', Validators.required],
      osVersion: ['', Validators.required],
      processor: ['', Validators.required],
      ramAmount: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  public ngOnInit(): void {
    const routeIdentifier = this.activatedRoute.snapshot.paramMap.get('identifier');
    if (routeIdentifier) {
      this.isEditMode = true;
      this.currentDeviceIdentifier = routeIdentifier;
      this.deviceFormGroup.get('name')?.clearAsyncValidators();
      this.deviceFormGroup.get('name')?.updateValueAndValidity();
      
      this.deviceService.retrieveDeviceByIdentifier(this.currentDeviceIdentifier)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe({
          next: (device: Device) => {
            this.deviceFormGroup.patchValue(device);
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public submitDeviceForm(): void {
    if (this.deviceFormGroup.invalid) {
      this.deviceFormGroup.markAllAsTouched();
      return;
    }

    const devicePayload: Device = {
      id: this.currentDeviceIdentifier,
      ...this.deviceFormGroup.value
    };

    const requestObservable = this.isEditMode
      ? this.deviceService.editDevice(devicePayload)
      : this.deviceService.addDevice(devicePayload);

    requestObservable
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: () => {
          this.router.navigate([ApplicationConstants.Routes.DeviceList]);
        },
        error: (error: Error) => {
          console.error(error.message);
        }
      });
  }

  private uniquenessValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return this.deviceService.retrieveAllDevices().pipe(
        map((devices: Device[]) => {
          const deviceExists = devices.some(device => device.name.toLowerCase() === control.value.toLowerCase());
          return deviceExists ? { duplicateDevice: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}
