import { UserService } from './../../services/user/user.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem, ItemService } from '../../services/item/item.service';
import { ItemDetailsComponent } from '../../components/item-details/item-details.component';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [ItemDetailsComponent],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css',
})
export class ItemPageComponent {
  route = inject(ActivatedRoute);
  itemService = inject(ItemService);
  userService = inject(UserService);
  id!: string;
  item!: IItem | null;
  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
      if (this.id) {
        this.getItemData(this.id);
        this.userService.addToLastVisitedProducts(this.id);
      }
    });
  }
  async getItemData(id: string) {
    (await this.itemService.getItemById(id)).subscribe((data) => {
      this.item = data;
    });
  }
}
