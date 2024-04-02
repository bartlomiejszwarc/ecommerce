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
  currentImage: number = 0;

  setNextImageRight() {
    if (this.currentImage === this.images!.length - 1) {
      this.currentImage = 0;
    } else {
      this.currentImage = this.currentImage + 1;
    }
  }
  setNextImageLeft() {
    if (this.currentImage === 0) {
      this.currentImage = this.images!.length - 1;
    } else {
      this.currentImage = this.currentImage - 1;
    }
  }
}
