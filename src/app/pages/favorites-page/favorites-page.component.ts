import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IItem, ItemService } from '../../services/item/item.service';
import { ResultsItemCardComponent } from '../../components/results-item-card/results-item-card.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [ResultsItemCardComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent {
  userService = inject(UserService);
  itemService = inject(ItemService);
  userId!: string;
  favorites: IItem[] = [];

  async ngOnInit() {
    this.getUsersFavorites();
  }

  async getUsersFavorites() {
    this.userService.userSubject.getValue();
    const userSubscription = this.userService.getUser().subscribe(async (user) => {
      this.favorites = [];
      if (user) {
        for (const id of user?.favorites) {
          (await this.itemService.getItemById(id)).subscribe((item) => {
            this.favorites.push(item as IItem);
          });
        }
        userSubscription.unsubscribe();
      }
    });
  }
}
