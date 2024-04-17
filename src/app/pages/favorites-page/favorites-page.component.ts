import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  userId!: string;
  async ngOnInit() {}
}
