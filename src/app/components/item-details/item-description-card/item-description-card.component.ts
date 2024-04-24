import { Component, Input } from '@angular/core';
import { IItem } from '../../../services/item/item.service';
import { ItemDescriptionCardTagComponent } from './item-description-card-tag/item-description-card-tag.component';

@Component({
  selector: 'app-item-description-card',
  standalone: true,
  imports: [ItemDescriptionCardTagComponent],
  templateUrl: './item-description-card.component.html',
  styleUrl: './item-description-card.component.css',
})
export class ItemDescriptionCardComponent {
  @Input() item!: IItem;
}
