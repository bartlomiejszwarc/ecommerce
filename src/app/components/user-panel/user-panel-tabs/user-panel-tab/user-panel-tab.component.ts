import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-panel-tab',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-panel-tab.component.html',
  styleUrl: './user-panel-tab.component.css',
})
export class UserPanelTabComponent {
  @Input() url!: string;
  @Input() name!: string;
  @Input() icon!: string;
  @Input() activeTab!: string;
}
