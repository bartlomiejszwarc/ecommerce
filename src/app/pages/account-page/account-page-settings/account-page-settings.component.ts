import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ButtonFormSubmitComponent } from '../../../components/button-form-submit/button-form-submit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-page-settings',
  standalone: true,
  imports: [ButtonFormSubmitComponent],
  templateUrl: './account-page-settings.component.html',
  styleUrl: './account-page-settings.component.css',
})
export class AccountPageSettingsComponent {
  authService = inject(AuthService);
  router = inject(Router);
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
