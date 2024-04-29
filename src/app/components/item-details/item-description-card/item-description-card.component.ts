import { Component, Input, inject } from '@angular/core';
import { IItem } from '../../../services/item/item.service';
import { ItemDescriptionCardTagComponent } from './item-description-card-tag/item-description-card-tag.component';
import { UserService, IUser } from '../../../services/user/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-item-description-card',
  standalone: true,
  imports: [ItemDescriptionCardTagComponent, MatDialogModule, DeleteDialogComponent],
  templateUrl: './item-description-card.component.html',
  styleUrl: './item-description-card.component.css',
})
export class ItemDescriptionCardComponent {
  @Input() item!: IItem;
  dialog = inject(MatDialog);

  userService = inject(UserService);
  user!: IUser;

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user as IUser;
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    const instance = dialogRef.componentInstance;
    if (this.item.id) instance.itemId = this.item.id;
    if (this.item.imagesUrls) instance.imagesUrls = this.item.imagesUrls;
  }
}
