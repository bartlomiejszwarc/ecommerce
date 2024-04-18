import { Component, Input, inject } from '@angular/core';
import { IItem, ItemService } from '../../../services/item/item.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-last-visited-product-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './last-visited-product-card.component.html',
  styleUrl: './last-visited-product-card.component.css',
})
export class LastVisitedProductCardComponent {
  @Input() itemId!: string;
  item!: IItem;
  itemService = inject(ItemService);

  async ngOnInit() {
    await this.getItemDetailsById();
  }

  async getItemDetailsById() {
    (await this.itemService.getItemById(this.itemId)).subscribe((item) => {
      this.item = item as IItem;
    });
  }
}
