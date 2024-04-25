import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider-with-text',
  standalone: true,
  imports: [],
  templateUrl: './divider-with-text.component.html',
  styleUrl: './divider-with-text.component.css',
})
export class DividerWithTextComponent {
  @Input() text: string = '';
}
