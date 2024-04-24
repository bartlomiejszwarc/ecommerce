import { Component } from '@angular/core';
import { categories } from '../../../../assets/categories/categories';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-box.component.html',
  styleUrl: './category-box.component.css',
})
export class CategoryBoxComponent {
  categories = categories;
  index = 0;
  fadeIn = false;
  animationDuration = 10000;

  handleImageLoad() {
    this.fadeIn = true;
    setTimeout(() => {
      this.fadeIn = false;
    }, this.animationDuration - 1000);
  }

  ngOnInit() {
    setInterval(() => {
      if (this.index + 1 === this.categories.length) this.index = 0;
      else this.index = this.index + 1;
      this.fadeIn = false;
    }, this.animationDuration);
  }
}
