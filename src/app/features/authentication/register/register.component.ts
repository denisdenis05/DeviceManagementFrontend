import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ApplicationConstants } from '../../../core/constants/application.constants';
import { RegisterRequest } from '../../../core/models/register-request.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public validationMessages = ApplicationConstants.ValidationMessages;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submitRegistration(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request: RegisterRequest = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authenticationService.register(request).subscribe({
      next: () => {
        this.router.navigate([ApplicationConstants.Routes.DeviceList]);
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      }
    });
  }

  public navigateToLogin(): void {
    this.router.navigate([ApplicationConstants.Routes.Login]);
  }
}
