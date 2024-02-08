import { Routes } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CreateItemPageComponent } from './pages/create-item-page/create-item-page.component';

export const routes: Routes = [
  { path: 'signup', component: SignupPageComponent },
  { path: '', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'create', component: CreateItemPageComponent },
];
