import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ApplicationConstants } from '../../../core/constants/application.constants';
import { LoginRequest } from '../../../core/models/login-request.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public validationMessages = ApplicationConstants.ValidationMessages;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authenticationService.login(request).subscribe({
      next: () => {
        this.router.navigate([ApplicationConstants.Routes.DeviceList]);
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      }
    });
  }

  public navigateToRegister(): void {
    this.router.navigate([ApplicationConstants.Routes.Register]);
  }
}
