import { Component, Input, inject } from '@angular/core';
import { IUpdateUserData, IUser, UserService } from '../../../services/user/user.service';
import { ButtonFormSubmitComponent } from '../../../components/button-form-submit/button-form-submit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account-page-details',
  standalone: true,
  imports: [
    ButtonFormSubmitComponent,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './account-page-details.component.html',
  styleUrl: './account-page-details.component.css',
})
export class AccountPageDetailsComponent {
  @Input() user: IUser | null = null;
  userService = inject(UserService);
  displayName!: string;
  phoneNumber!: string;
  location!: string;
  ngOnInit() {}

  updateUserData() {
    try {
      if (this.user) {
        const user: IUpdateUserData = {
          userId: this.user.userId,
          displayName: this.displayName,
          phoneNumber: this.phoneNumber,
          location: this.location,
        };
        this.userService.updateUserData(user);
      }
    } catch (e) {}
  }

  onDisplayNameChange(displayName: string) {
    this.displayName = displayName;
  }
  onLocationChange(location: string) {
    this.location = location;
  }
  onPhoneNumberChange(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
}