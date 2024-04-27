import { Component, Input, inject } from '@angular/core';
import { IItem } from '../../../services/item/item.service';
import { ResultsItemCardComponent } from '../../../components/results-item-card/results-item-card.component';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account-page-sales',
  standalone: true,
  imports: [ResultsItemCardComponent, RouterModule, MatProgressSpinnerModule],
  templateUrl: './account-page-sales.component.html',
  styleUrl: './account-page-sales.component.css',
})
export class AccountPageSalesComponent {
  @Input() userProducts: IItem[] | null = [];
  @Input() isLoading!: boolean;
  title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Your sales');
  }
}
