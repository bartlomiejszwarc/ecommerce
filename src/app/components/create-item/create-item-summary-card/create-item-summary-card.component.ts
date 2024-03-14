import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-create-item-summary-card',
  standalone: true,
  imports: [],
  templateUrl: './create-item-summary-card.component.html',
  styleUrl: './create-item-summary-card.component.css',
})
export class CreateItemSummaryCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() isNew!: boolean;
  @Input() price!: number;
  @Input() imagesArray: string = '';
}
