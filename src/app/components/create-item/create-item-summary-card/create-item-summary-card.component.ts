import { Component, Input, SimpleChanges } from '@angular/core';
import { ItemDescriptionCardTagComponent } from '../../item-details/item-description-card/item-description-card-tag/item-description-card-tag.component';

@Component({
  selector: 'app-create-item-summary-card',
  standalone: true,
  imports: [ItemDescriptionCardTagComponent],
  templateUrl: './create-item-summary-card.component.html',
  styleUrl: './create-item-summary-card.component.css',
})
export class CreateItemSummaryCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() isNew!: boolean;
  @Input() price!: number;
  @Input() category!: string;
  @Input() subcategory!: string;
  @Input() imagesArray: string[] = [];
  @Input() isSalePrivate!: boolean;
}
