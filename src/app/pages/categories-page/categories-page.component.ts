import { Component, inject } from '@angular/core';
import { CategoryComponent } from '../../components/category/category/category.component';
import { categories, ICategory } from '../../../assets/categories/categories';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent {
  categories: ICategory[] = categories;
  title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Browse categories');
  }
}
