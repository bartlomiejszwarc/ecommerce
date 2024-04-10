import { Component, inject } from '@angular/core';
import { UserPanelTabsComponent } from '../../components/user-panel/user-panel-tabs/user-panel-tabs.component';
import { ActivatedRoute } from '@angular/router';
import { AccountPageDetailsComponent } from './account-page-details/account-page-details.component';
import { AccountPageSalesComponent } from './account-page-sales/account-page-sales.component';
import { AccountPageSettingsComponent } from './account-page-settings/account-page-settings.component';
import { IUser, UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { IItem } from '../../services/item/item.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    UserPanelTabsComponent,
    AccountPageDetailsComponent,
    AccountPageSalesComponent,
    AccountPageSettingsComponent,
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  userProducts: IItem[] | null = [];
  user: IUser | null = null;
  route = inject(ActivatedRoute);
  tab!: string;
  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.tab = params['tab'];
    });
    this.getUsersProdcuts();
  }

  isTabActive(tab: string) {}

  async getUsersProdcuts() {
    (await this.authService.getCurrentUserData()).subscribe(async (user: any) => {
      if (user) {
        (await this.userService.getUserDetailsById(user.uid)).subscribe((user) => {
          this.user = user;
        });
        this.userService.getUserProducts(user.uid).then((data) => {
          this.userProducts = data;
        });
      }
    });
  }
}
