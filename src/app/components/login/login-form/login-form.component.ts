import { AuthService } from './../../../services/auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonFormSubmitComponent } from '../../button-form-submit/button-form-submit.component';
import { LogoComponent } from '../../logo/logo.component';
import { Router } from '@angular/router';

interface UserLoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ButtonFormSubmitComponent, MatIconModule, FormsModule, RouterModule, ReactiveFormsModule, LogoComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage = signal('');
  submitDone = false;
  constructor() {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmitData = async () => {
    try {
      this.submitDone = true;
      const formData: UserLoginForm = this.loginForm.value;
      await this.authService.login(formData);
      this.router.navigate(['/home']);
    } catch (e) {
      this.submitDone = false;
      this.errorMessage.set('Invalid credentials');
    }
  };

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  buttonText: string = 'Sign in';
}
