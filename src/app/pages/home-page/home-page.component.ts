import { Component, inject } from '@angular/core';
import { ButtonFormSubmitComponent } from './../../components/button-form-submit/button-form-submit.component';
import { AuthService } from '../../services/auth/auth.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { IUser, UserService } from '../../services/user/user.service';
import { LastVisitedProductsListComponent } from '../../components/home/last-visited-products-list/last-visited-products-list.component';
import { TopCategoriesListComponent } from '../../components/home/top-categories-list/top-categories-list.component';
import { CategoryBoxComponent } from '../../components/home/category-box/category-box.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ButtonFormSubmitComponent,
    SearchBarComponent,
    LastVisitedProductsListComponent,
    TopCategoriesListComponent,
    CategoryBoxComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  title = inject(Title);

  buttonText: string = 'logout';
  user!: IUser;

  ngOnInit() {
    this.title.setTitle('eSale / Home');
    const userSubscription = this.userService.userSubject.subscribe((user) => {
      this.user = user as IUser;
    });
  }

  logout() {
    this.authService.logout();
  }
}
