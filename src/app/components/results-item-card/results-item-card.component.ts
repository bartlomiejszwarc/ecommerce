import { Component, Input, inject, input } from '@angular/core';
import { IItem, ItemService } from './../../services/item/item.service';
import { RouterModule } from '@angular/router';
import { IUser, UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-results-item-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './results-item-card.component.html',
  styleUrl: './results-item-card.component.css',
})
export class ResultsItemCardComponent {
  @Input() item!: IItem;
  descriptionMaxLength: number = 100;
  userService = inject(UserService);
  user!: IUser;

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user as IUser;
    });
  }

  addToFavorites(itemId: string) {
    //tu raz
    this.userService.addToFavorites(itemId);
  }

  removeFromFavorites(itemId: string) {
    this.userService.removeFromFavorites(itemId);
  }

  checkIfIsFavorite() {
    if (this.user?.favorites?.length > 0) {
      if (this.user.favorites.includes(this.item.id)) return true;
    }
    return false;
  }
}
