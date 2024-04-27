import { Component, WritableSignal, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ButtonFormSubmitComponent } from '../../../components/button-form-submit/button-form-submit.component';
import { Router } from '@angular/router';
import { DividerWithTextComponent } from '../../../components/divider-with-text/divider-with-text.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateItemFinishedBoardComponent } from '../../../components/create-item/create-item-finished-board/create-item-finished-board.component';
import { CreateItemSummaryCardComponent } from '../../../components/create-item/create-item-summary-card/create-item-summary-card.component';
import { ImageAddFieldComponent } from '../../../components/create-item/image-add-field/image-add-field.component';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account-page-settings',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    ImageAddFieldComponent,
    CreateItemSummaryCardComponent,
    MatRadioModule,
    ButtonFormSubmitComponent,
    MatSelectModule,
    CreateItemFinishedBoardComponent,
    MatProgressSpinnerModule,
    DividerWithTextComponent,
    MatIconModule,
  ],
  templateUrl: './account-page-settings.component.html',
  styleUrl: './account-page-settings.component.css',
})
export class AccountPageSettingsComponent {
  authService = inject(AuthService);
  router = inject(Router);
  title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Settings');
  }

  newPassword: string = '';
  newPasswordRepeat: string = '';

  passwordVisible: WritableSignal<boolean> = signal(false);

  onNewPasswordChange(value: string) {
    this.newPassword = value;
  }

  onNewPasswordRepeatChange(value: string) {
    this.newPasswordRepeat = value;
  }

  onPasswordChangeSubmit() {
    if (this.newPassword === this.newPasswordRepeat)
      this.authService
        .updatePassword(this.newPassword)
        ?.then(() => {
          this.newPassword = '';
          this.newPasswordRepeat = '';
        })
        .catch((e) => {
          this.logout();
        });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
