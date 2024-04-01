import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { IItem } from '../../services/item/item.service';
import { ItemDetailsImagesComponent } from './item-details-images/item-details-images.component';
import { SellerInfoCardComponent } from './seller-info-card/seller-info-card.component';
import { IUser, UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [ItemDetailsImagesComponent, SellerInfoCardComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  @Input() item!: IItem | null;
  userData: IUser | null = null;
  userService = inject(UserService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && !changes['item'].firstChange) this.getSellerDetails();
  }

  async getSellerDetails() {
    if (this.item) {
      (await this.userService.getUserDetailsById(this.item.userId)).subscribe((data) => {
        this.userData = data;
      });
    }
  }
}
