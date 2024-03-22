import { Component, input } from '@angular/core';
import { IItem, ItemService } from './../../services/item/item.service';

@Component({
  selector: 'app-results-item-card',
  standalone: true,
  imports: [],
  templateUrl: './results-item-card.component.html',
  styleUrl: './results-item-card.component.css',
})
export class ResultsItemCardComponent {
  item = input<IItem>;
}
