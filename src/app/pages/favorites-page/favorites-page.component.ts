import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IItem, ItemService } from '../../services/item/item.service';
import { ResultsItemCardComponent } from '../../components/results-item-card/results-item-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [ResultsItemCardComponent, MatProgressSpinnerModule, RouterModule],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent {
  userService = inject(UserService);
  itemService = inject(ItemService);
  userId!: string;
  favorites: IItem[] = [];
  itemsLoaded: boolean = false;

  async ngOnInit() {
    this.getUsersFavorites();
  }

  async getUsersFavorites() {
    this.userService.userSubject.getValue();
    const userSubscription = this.userService.getUser().subscribe(async (user) => {
      this.favorites = [];
      if (user && user.favorites) {
        for (const id of user?.favorites) {
          (await this.itemService.getItemById(id)).subscribe({
            next: (item) => {
              this.itemsLoaded = false;
              this.favorites.push(item as IItem);
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              this.itemsLoaded = true;
            },
          });
        }
        userSubscription.unsubscribe();
      }
      this.itemsLoaded = true;
    });
  }
}
