import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css',
})
export class ResultsPageComponent {
  route = inject(ActivatedRoute);
  category!: string;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.category = params['subcategory'];
      console.log(this.category);
    });
  }
}
