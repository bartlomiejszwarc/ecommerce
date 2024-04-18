import { LastVisitedProductCardComponent } from '../last-visited-product-card/last-visited-product-card.component';
import { IItem } from './../../../services/item/item.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-last-visited-products-list',
  standalone: true,
  imports: [LastVisitedProductCardComponent],
  templateUrl: './last-visited-products-list.component.html',
  styleUrl: './last-visited-products-list.component.css',
})
export class LastVisitedProductsListComponent {
  @Input() products: string[] | undefined = [];
}
