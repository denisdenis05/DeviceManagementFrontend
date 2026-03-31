import { Routes } from '@angular/router';
import { DeviceListComponent } from './features/devices/device-list/device-list.component';
import { DeviceDetailComponent } from './features/devices/device-detail/device-detail.component';
import { DeviceFormComponent } from './features/devices/device-form/device-form.component';
import { ApplicationConstants } from './core/constants/application.constants';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
  { path: ApplicationConstants.Routes.Default, redirectTo: ApplicationConstants.Routes.Login, pathMatch: 'full' },
  { path: ApplicationConstants.Routes.Login, component: LoginComponent },
  { path: ApplicationConstants.Routes.Register, component: RegisterComponent },
  { path: ApplicationConstants.Routes.DeviceList, component: DeviceListComponent, canActivate: [authenticationGuard] },
  { path: ApplicationConstants.Routes.DeviceDetail, component: DeviceDetailComponent, canActivate: [authenticationGuard] },
  { path: ApplicationConstants.Routes.DeviceCreate, component: DeviceFormComponent, canActivate: [authenticationGuard] },
  { path: ApplicationConstants.Routes.DeviceEdit, component: DeviceFormComponent, canActivate: [authenticationGuard] }
];
