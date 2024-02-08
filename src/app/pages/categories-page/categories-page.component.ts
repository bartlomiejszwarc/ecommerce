import { Component } from '@angular/core';
import { CategoryComponent } from '../../components/category/category/category.component';
import { categories, ICategory } from '../../../assets/categories/categories';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent {
  categories: ICategory[] = categories;
  ngOnInit(): void {
    console.log(this.categories);
  }
}
