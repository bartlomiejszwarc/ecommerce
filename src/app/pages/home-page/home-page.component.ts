import { Component, inject } from '@angular/core';
import { ButtonFormSubmitComponent } from './../../components/button-form-submit/button-form-submit.component';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonFormSubmitComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  authService = inject(AuthService);
  buttonText: string = 'logout';

  logout() {
    this.authService.logout();
  }
}
