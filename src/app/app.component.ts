import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupPageComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);
  // ^ bug firebase error: expected first argument to collection() to be a colletion refercene, a document reference or firebase firestore

  async ngOnInit() {
    await this.getUserData();
  }
  async getUserData() {
    (await this.authService.getCurrentUserData()).subscribe(async (user: any) => {
      if (user) {
        (await this.userService.getUserDetailsById(user.uid)).subscribe((user) => {
          this.userService.setUser(user);
        });
      }
    });
  }

  title = 'eSale';
}
