import { Routes } from '@angular/router';
import { DeviceListComponent } from './features/devices/device-list/device-list.component';
import { DeviceDetailComponent } from './features/devices/device-detail/device-detail.component';
import { DeviceFormComponent } from './features/devices/device-form/device-form.component';
import { ApplicationConstants } from './core/constants/application.constants';

export const routes: Routes = [
  { path: ApplicationConstants.Routes.Default, redirectTo: ApplicationConstants.Routes.DeviceList, pathMatch: 'full' },
  { path: ApplicationConstants.Routes.DeviceList, component: DeviceListComponent },
  { path: ApplicationConstants.Routes.DeviceDetail, component: DeviceDetailComponent },
  { path: ApplicationConstants.Routes.DeviceCreate, component: DeviceFormComponent },
  { path: ApplicationConstants.Routes.DeviceEdit, component: DeviceFormComponent }
];
