import { SignupFormComponent } from './../../components/signup/signup-form/signup-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {}
