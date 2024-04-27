import { ButtonFormSubmitComponent } from './../../button-form-submit/button-form-submit.component';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
interface UserRegisterForm {
  email: string;
  displayName: string;
  password: string;
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ButtonFormSubmitComponent, MatIconModule, FormsModule, RouterModule, ReactiveFormsModule, LogoComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  authService = inject(AuthService);
  errorMessage = signal<string>('');
  userService = inject(UserService);

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    displayName: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmitData = () => {
    if (this.password!.value.length > 6) {
      const formData: UserRegisterForm = this.signUpForm.value;
      this.authService
        .register(formData)
        .then(async () => {
          await this.getUserData();
        })
        .catch((e) => {
          console.log(e);
          this.errorMessage.set('Invalid e-mail or password');
        });
    } else {
      this.errorMessage.set('Password must be at least 6 characters long');
    }
  };
  async getUserData() {
    (await this.authService.getCurrentUserData()).subscribe(async (user: any) => {
      if (user) {
        (await this.userService.getUserDetailsById(user.uid)).subscribe((user) => {
          this.userService.setUser(user);
        });
      }
    });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  buttonText: string = 'Sign up';
}
