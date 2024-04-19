import { Component, inject } from '@angular/core';
import { ICategoriesStats, ItemService } from '../../../services/item/item.service';
import { categories } from '../../../../assets/categories/categories';
import { TopCategoriesCardComponent } from '../top-categories-card/top-categories-card.component';
import { TextHeaderComponent } from '../../text-header/text-header.component';

export interface ICategoryExtended {
  category: string;
  count: number;
  icon: string;
}
@Component({
  selector: 'app-top-categories-list',
  standalone: true,
  imports: [TopCategoriesCardComponent, TextHeaderComponent],
  templateUrl: './top-categories-list.component.html',
  styleUrl: './top-categories-list.component.css',
})
export class TopCategoriesListComponent {
  itemService = inject(ItemService);
  categoriesData: ICategoryExtended[] = [];

  async ngOnInit() {
    await this.getTopCategories();
  }

  async getTopCategories() {
    const stats = await this.itemService.getCategoriesStats();
    this.categoriesData = this.mapCategories(stats);
    this.categoriesData.sort((a, b) => b.count - a.count);
    this.categoriesData = this.categoriesData.slice(0, 5);
  }

  mapCategories(stats: ICategoriesStats): any {
    return Object.keys(stats).map((categoryName) => {
      const category = categories.find((c) => c.category === categoryName);
      return {
        category: categoryName,
        count: stats[categoryName as keyof ICategoriesStats],
        icon: category ? category.icon : undefined,
      };
    });
  }
}
