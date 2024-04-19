import { Component, Input } from '@angular/core';
import { ICategoryExtended } from '../top-categories-list/top-categories-list.component';

@Component({
  selector: 'app-top-categories-card',
  standalone: true,
  imports: [],
  templateUrl: './top-categories-card.component.html',
  styleUrl: './top-categories-card.component.css',
})
export class TopCategoriesCardComponent {
  @Input() category!: ICategoryExtended;
}
