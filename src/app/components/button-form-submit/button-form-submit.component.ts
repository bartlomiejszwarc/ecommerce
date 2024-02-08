import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-form-submit',
  standalone: true,
  imports: [],
  templateUrl: './button-form-submit.component.html',
  styleUrl: './button-form-submit.component.css',
})
export class ButtonFormSubmitComponent {
  @Input() buttonText: string = '';
}
