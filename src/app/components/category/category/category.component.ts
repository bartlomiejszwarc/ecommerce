import { RouterModule } from '@angular/router';
import { ICategory } from './../../../../assets/categories/categories';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Input() category!: ICategory;
}
