import { Component, Input, SimpleChanges } from '@angular/core';
import { IUser } from '../../../services/user/user.service';
import { IItem } from '../../../services/item/item.service';
import { LogoComponent } from '../../logo/logo.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.css',
})
export class UserInfoCardComponent {
  @Input() user!: IUser | null;
  @Input() item!: IItem;
  dateConverted!: string;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      if (this.user) {
        var date = this.user!.createdAt as any;
        this.dateConverted = formatDate(new Date(date.seconds * 1000), 'mediumDate', 'en-US');
      }
    }
  }
}
