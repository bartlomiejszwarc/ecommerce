import { CreateItemComponent } from './../../components/create-item/create-item.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-item-page',
  standalone: true,
  imports: [CreateItemComponent],
  templateUrl: './create-item-page.component.html',
  styleUrl: './create-item-page.component.css',
})
export class CreateItemPageComponent {}
