import { Component, NgZone, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IItem, ItemService } from './../../services/item/item.service';
import { AuthService } from '../../services/auth/auth.service';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { ImageAddFieldComponent } from './image-add-field/image-add-field.component';
import { CreateItemSummaryCardComponent } from './create-item-summary-card/create-item-summary-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { ButtonFormSubmitComponent } from '../button-form-submit/button-form-submit.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ICategory, categories } from '../../../assets/categories/categories';
import { CreateItemFinishedBoardComponent } from './create-item-finished-board/create-item-finished-board.component';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    ImageAddFieldComponent,
    CreateItemSummaryCardComponent,
    MatRadioModule,
    ButtonFormSubmitComponent,
    MatSelectModule,
    CreateItemFinishedBoardComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CreateItemComponent {
  _ngZone = inject(NgZone);
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  itemService = inject(ItemService);
  authService = inject(AuthService);

  itemName: string = '';
  itemNameMaxLength: number = 100;
  itemDescription: string = '';
  itemDescriptionMaxLength: number = 1000;
  itemImagesArray: any[] = [];
  itemImagesToUploadArray: Blob[] = [];
  itemImagesArrayMaxLength: number = 3;
  array = Array.from({ length: this.itemImagesArrayMaxLength }, (_, index) => index);
  itemPrice: number = 0;
  itemIsNew: boolean = false;
  itemIsSalePrivate: boolean = true;
  itemCategory: string = '';
  itemSubcategory: string = '';
  currentCategory: any;
  isCreationFinished: boolean = false;
  isCreationProcessing: boolean = false;

  itemNameErrorMessage: string = '';
  itemImagesArrayErrorMessage: string = '';
  itemCategoryErrorMessage: string = '';

  categories: ICategory[] = categories;

  onCreateItem = async () => {
    try {
      const userId = this.authService.currentUser()?.uid;
      if (!userId) throw new Error('User not found');
      const validator = this.validateInputs(this.itemName, this.itemImagesArray, this.itemCategory);
      if (validator) {
        this.isCreationProcessing = true;
        const data: IItem = {
          userId: userId!,
          name: this.itemName,
          description: this.itemDescription,
          imagesArray: this.itemImagesToUploadArray,
          imagesUrls: null,
          price: this.itemPrice,
          isNew: this.itemIsNew,
          itemCategory: this.itemCategory,
          itemSubcategory: this.itemSubcategory,
          createdAt: new Date(),
          isSalePrivate: this.itemIsSalePrivate,
        };
        (await this.itemService.createItem(data)).subscribe({
          error: (err) => {
            this.isCreationProcessing = false;
            this.isCreationFinished = false;
          },
          complete: () => {
            this.isCreationFinished = true;
            this.isCreationProcessing = false;
          },
        });
      }
    } catch (e) {}
  };

  validateInputs(name: string, imagesArray: string[], itemCategory: string) {
    this.itemNameErrorMessage = '';
    this.itemCategoryErrorMessage = '';
    this.itemImagesArrayErrorMessage = '';
    var errors = 0;
    if (name.length === 0) {
      errors = errors + 1;
      this.itemNameErrorMessage = 'Sale must have a title';
    }
    if (imagesArray.length === 0) {
      errors = errors + 1;
      this.itemImagesArrayErrorMessage = 'You must add at least one image';
    }
    if (!itemCategory || itemCategory.length === 0) {
      errors = errors + 1;
      this.itemCategoryErrorMessage = 'Sale must have a category';
    }
    if (errors === 0) return true;
    else return false;
  }

  onChange(price: string) {
    try {
      let splitted = price.split('.');
      if (splitted.length > 1) {
        let firstValue = Number(splitted[0]);
        let secondValue = Number(splitted[1]?.toString().substring(0, 2));
        const value = firstValue + '.' + secondValue;
        this.itemPrice = Number(value);
      }
    } catch (e) {
      this.itemPrice = 0;
    }
  }

  onNameChange(name: string) {
    this.itemNameErrorMessage = '';
  }

  onCategoryChange(category: MatSelectChange) {
    this.itemCategoryErrorMessage = '';
    this.itemSubcategory = '';
    this.currentCategory = null;
    this.currentCategory = category.value;
    this.itemCategory = category.value.category;
  }
  onSubcategoryChange(subcategory: MatSelectChange) {
    this.itemSubcategory = subcategory.value;
  }

  pushImageToArray(image: File, index: number) {
    this.itemImagesArrayErrorMessage = '';
    const file = URL.createObjectURL(image);
    this.itemImagesArray.splice(index, 1, file);
    const blob = image.slice(0, image.size, image.type);
    this.itemImagesToUploadArray.splice(index, 1, blob);
  }
}
