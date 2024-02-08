import { LoginFormComponent } from './../../components/login/login-form/login-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {}
