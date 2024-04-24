import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-description-card-tag',
  standalone: true,
  imports: [],
  templateUrl: './item-description-card-tag.component.html',
  styleUrl: './item-description-card-tag.component.css',
})
export class ItemDescriptionCardTagComponent {
  @Input() text = '';
}
