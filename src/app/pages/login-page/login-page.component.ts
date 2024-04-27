import { Title } from '@angular/platform-browser';
import { LoginFormComponent } from './../../components/login/login-form/login-form.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  title = inject(Title);

  ngOnInit() {
    this.title.setTitle('eSale / Sign in');
  }
}
