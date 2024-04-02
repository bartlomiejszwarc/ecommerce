import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { IItem } from '../../services/item/item.service';
import { ItemDetailsImagesComponent } from './item-details-images/item-details-images.component';
import { IUser, UserService } from '../../services/user/user.service';
import { SummaryContactCardComponent } from './summary-contact-card/summary-contact-card/summary-contact-card.component';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [ItemDetailsImagesComponent, SummaryContactCardComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  @Input() item!: IItem | null;
  user: IUser | null = null;
  userService = inject(UserService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && !changes['item'].firstChange) this.getSellerDetails();
  }

  async getSellerDetails() {
    if (this.item) {
      (await this.userService.getUserDetailsById(this.item.userId)).subscribe((data) => {
        this.user = data;
      });
    }
  }
}
