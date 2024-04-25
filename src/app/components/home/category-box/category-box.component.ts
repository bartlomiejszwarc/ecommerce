import { Component } from '@angular/core';
import { categories } from '../../../../assets/categories/categories';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animation } from '@angular/animations';

@Component({
  selector: 'app-category-box',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-box.component.html',
  styleUrl: './category-box.component.css',
})
export class CategoryBoxComponent {
  categories = categories;
  index = 0;
  fadeIn = false;
  animationDuration = 10000;
  interval!: NodeJS.Timeout;
  handleImageLoad() {
    this.fadeIn = true;
    setTimeout(() => {
      this.fadeIn = false;
    }, this.animationDuration - 1000);
  }
  ngOnInit() {
    window.setInterval(() => {
      if (this.index + 1 === categories.length - 1) this.index = 0;
      else this.index = this.index + 1;
      this.fadeIn = false;
    }, this.animationDuration);
  }

  ngOnDistroy() {
    clearInterval(this.interval);
  }
}
