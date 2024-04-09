import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { IItem } from '../../../services/item/item.service';
import { ResultsItemCardComponent } from '../../../components/results-item-card/results-item-card.component';

@Component({
  selector: 'app-account-page-sales',
  standalone: true,
  imports: [ResultsItemCardComponent],
  templateUrl: './account-page-sales.component.html',
  styleUrl: './account-page-sales.component.css',
})
export class AccountPageSalesComponent {
  @Input() userProducts: IItem[] | null = [];
}
