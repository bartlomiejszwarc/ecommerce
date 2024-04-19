import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-header',
  standalone: true,
  imports: [],
  templateUrl: './text-header.component.html',
  styleUrl: './text-header.component.css',
})
export class TextHeaderComponent {
  @Input() text: string = '';
}
