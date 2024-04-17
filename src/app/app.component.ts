import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupPageComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  //authService = inject(AuthService);
  // ^ bug firebase error: expected first argument to collection() to be a colletion refercene, a document reference or firebase firestore

  ngOnInit() {
    console.log('App init');
  }

  title = 'eSale';
}
