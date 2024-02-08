import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-field',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-field.component.html',
  styleUrl: './navbar-field.component.css',
})
export class NavbarFieldComponent {
  @Input() iconOnly: boolean = false;
  @Input() text?: string = '';
  @Input() iconName: string = '';
  @Input() url: string = '';
}
