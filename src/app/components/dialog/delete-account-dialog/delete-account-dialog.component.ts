import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-account-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-account-dialog.component.html',
  styleUrl: './delete-account-dialog.component.css',
})
export class DeleteAccountDialogComponent {
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);
  async deleteAccount() {
    this.authService.deleteAccount();
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
