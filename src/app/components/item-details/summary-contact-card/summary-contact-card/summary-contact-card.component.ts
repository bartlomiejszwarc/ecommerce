import { Component, Input, WritableSignal, signal } from '@angular/core';
import { IUser } from '../../../../services/user/user.service';
import { IItem } from '../../../../services/item/item.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-summary-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './summary-contact-card.component.html',
  styleUrl: './summary-contact-card.component.css',
})
export class SummaryContactCardComponent {
  @Input() user: IUser | null = null;
  @Input() item: IItem | null = null;

  isEmailShown: WritableSignal<boolean> = signal(false);
  isPhoneNumberShown: WritableSignal<boolean> = signal(false);
  dateConverted!: string;

  ngOnInit() {
    if (this.item) var date = this.item.createdAt as any;
    this.dateConverted = formatDate(new Date(date.seconds * 1000), 'mediumDate', 'en-US');
  }
}
