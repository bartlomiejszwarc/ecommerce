import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsItemCardComponent } from '../../components/results-item-card/results-item-card.component';
import { ItemService, IItem } from '../../services/item/item.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [ResultsItemCardComponent],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css',
})
export class ResultsPageComponent {
  route = inject(ActivatedRoute);
  itemService = inject(ItemService);
  title = inject(Title);
  subcategory!: string;
  category!: string;
  keyword!: string;
  urlPath!: string;
  resultsAmount: number = 2;
  results: IItem[] = [];
  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.urlPath = url[0].path;
    });
    this.route.params.subscribe(async (params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.title.setTitle(this.category);
      if (this.subcategory) this.title.setTitle(this.category + ' - ' + this.subcategory);
      if (this.category) this.getResults();
    });
  }

  getResults = async () => {
    if (this.category && !this.subcategory) {
      (await this.itemService.getProductsByCategory(this.category)).subscribe((res) => {
        this.results = res;
      });
    }
    if (this.category && this.subcategory) {
      (await this.itemService.getProductsBySubcategory(this.subcategory)).subscribe((res) => {
        this.results = res;
      });
    }
  };
}
