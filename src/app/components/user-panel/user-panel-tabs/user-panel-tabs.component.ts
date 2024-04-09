import { UserPanelTabComponent } from './user-panel-tab/user-panel-tab.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-panel-tabs',
  standalone: true,
  imports: [UserPanelTabComponent],
  templateUrl: './user-panel-tabs.component.html',
  styleUrl: './user-panel-tabs.component.css',
})
export class UserPanelTabsComponent {
  @Input() activeTab!: string;
  tabs: { tabUrl: string; tabName: string; icon: string }[] = [
    { tabUrl: 'sales', tabName: 'Your sales', icon: 'sell' },
    { tabUrl: 'details', tabName: 'Account details', icon: 'account_box' },
    { tabUrl: 'settings', tabName: 'Settings', icon: 'manage_accounts' },
  ];
}
