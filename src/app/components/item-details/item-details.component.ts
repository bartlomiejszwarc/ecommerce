import { Component, Input, SimpleChanges } from '@angular/core';
import { IItem } from '../../services/item/item.service';
import { ItemDetailsImagesComponent } from './item-details-images/item-details-images.component';
import { SellerInfoCardComponent } from './seller-info-card/seller-info-card.component';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [ItemDetailsImagesComponent, SellerInfoCardComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  @Input() item!: IItem | null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && !changes['item'].firstChange) this.getSellerDetails();
  }

  getSellerDetails() {
    console.log(this.item?.userId);
  }
}
