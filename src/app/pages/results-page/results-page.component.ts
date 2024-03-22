import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css',
})
export class ResultsPageComponent {
  route = inject(ActivatedRoute);
  subcategory!: string;
  category!: string;
  keyword!: string;
  urlPath!: string;
  resultsAmount: number = 0;
  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.urlPath = url[0].path;
    });
    this.route.params.subscribe(async (params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.keyword = params['keyword'];
      if (this.category && this.subcategory) this.getResults();
    });
  }

  getResults = () => {
    console.log(this.category, this.subcategory, this.keyword);
  };
}
