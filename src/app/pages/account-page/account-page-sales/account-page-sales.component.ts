import { Component, Input, inject } from '@angular/core';
import { IItem } from '../../../services/item/item.service';
import { ResultsItemCardComponent } from '../../../components/results-item-card/results-item-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-page-sales',
  standalone: true,
  imports: [ResultsItemCardComponent, RouterModule],
  templateUrl: './account-page-sales.component.html',
  styleUrl: './account-page-sales.component.css',
})
export class AccountPageSalesComponent {
  @Input() userProducts: IItem[] | null = [];
}
