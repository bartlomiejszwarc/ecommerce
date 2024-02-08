import { AuthService } from './../../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonFormSubmitComponent } from '../../button-form-submit/button-form-submit.component';
import { LogoComponent } from '../../logo/logo.component';

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
  constructor() {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmitData = () => {
    const formData: UserLoginForm = this.loginForm.value;
    this.authService.login(formData);
  };

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  buttonText: string = 'Sign in';
}
