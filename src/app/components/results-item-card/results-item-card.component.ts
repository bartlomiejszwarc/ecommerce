import { Component, Input, inject, input } from '@angular/core';
import { IItem, ItemService } from './../../services/item/item.service';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

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

  ngOnInit() {}

  addToFavorites(itemId: string) {
    this.userService.addToFavorites(itemId);
  }
}
