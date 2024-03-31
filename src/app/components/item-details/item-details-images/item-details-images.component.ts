import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-details-images',
  standalone: true,
  imports: [],
  templateUrl: './item-details-images.component.html',
  styleUrl: './item-details-images.component.css',
})
export class ItemDetailsImagesComponent {
  @Input() images!: string[] | null;
}
