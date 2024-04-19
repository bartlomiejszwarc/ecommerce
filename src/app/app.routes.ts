import { Routes } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CreateItemPageComponent } from './pages/create-item-page/create-item-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
  { path: 'signup', component: SignupPageComponent },
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  { path: 'home', component: HomePageComponent },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
  },
  {
    path: 'account/:tab',
    component: AccountPageComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
  },
  {
    path: 'account/:nonexisting',
    component: AccountPageComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
  },
  { path: 'categories', component: CategoriesPageComponent },
  {
    path: 'create',
    component: CreateItemPageComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
  },
  { path: 'category/:category/:subcategory', component: ResultsPageComponent },
  { path: 'category/:category', component: ResultsPageComponent },
  { path: 'search/:keyword', component: ResultsPageComponent },
  { path: 'sale/:id', component: ItemPageComponent },
];
