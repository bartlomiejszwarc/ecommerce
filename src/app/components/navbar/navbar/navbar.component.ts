import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../../logo/logo.component';
import { RouterModule } from '@angular/router';
import { NavbarFieldComponent } from '../navbar-field/navbar-field.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, LogoComponent, RouterModule, NavbarFieldComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
