import { Component, Input, WritableSignal, signal } from '@angular/core';

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
  autoplay: WritableSignal<boolean> = signal(true);
  autoplayInterval!: NodeJS.Timeout;

  ngOnInit() {
    this.autoplayImages();
  }

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

  autoplayImages() {
    if (this.autoplay()) this.autoplayInterval = setInterval(() => this.setNextImageRight(), 1500);
    if (!this.autoplay()) {
      clearInterval(this.autoplayInterval);
    }
  }
  setAutoplay() {
    this.autoplay.set(!this.autoplay());
    this.autoplayImages();
  }
}
