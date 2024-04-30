import { Component, Input, inject } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
} from '@angular/material/dialog';
import { ItemService } from '../../../services/item/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
})
export class DeleteDialogComponent {
  @Input() itemId!: string;
  @Input() imagesUrls!: string[];
  @Input() category!: string;
  itemService = inject(ItemService);
  dialog = inject(MatDialog);
  router = inject(Router);

  deleteItem() {
    if (this.itemId) {
      this.itemService.deleteItem(this.itemId, this.imagesUrls, this.category).then(() => {
        this.dialog.closeAll();
        this.router.navigate(['/home']);
      });
    }
  }
}
