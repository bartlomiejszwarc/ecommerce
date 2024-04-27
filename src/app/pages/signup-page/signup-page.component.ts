import { Title } from '@angular/platform-browser';
import { SignupFormComponent } from './../../components/signup/signup-form/signup-form.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  title = inject(Title);

  ngOnInit() {
    this.title.setTitle('eSale / Sign up');
  }
}
