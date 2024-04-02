import { Component, NgZone, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
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
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CreateItemComponent {
  _ngZone = inject(NgZone);
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
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

  categories: ICategory[] = categories;

  onCreateItem = async () => {
    try {
      const userId = this.authService.currentUser()?.uid;
      if (!userId) throw new Error('User not found');
      //const base64ImagesArray = await Promise.all(this.itemImagesArray.map(this.blobToBase64));

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
      this.itemService.createItem(data);
    } catch (e) {}
  };

  onChange(price: string) {
    try {
      let splitted = price.split('.');
      if (splitted.length > 1) {
        let firstValue = Number(splitted[0]);
        let secondValue = Number(splitted[1].toString().substring(0, 2));
        const value = firstValue + '.' + secondValue;
        this.itemPrice = Number(value);
      }
    } catch (e) {
      this.itemPrice = 0;
    }
  }

  onCategoryChange(category: MatSelectChange) {
    this.itemSubcategory = '';
    this.currentCategory = null;
    this.currentCategory = category.value;
    this.itemCategory = category.value.category;
  }
  onSubcategoryChange(subcategory: MatSelectChange) {
    this.itemSubcategory = subcategory.value;
  }

  pushImageToArray(image: File, index: number) {
    const file = URL.createObjectURL(image);
    this.itemImagesArray.splice(index, 1, file);
    const blob = image.slice(0, image.size, image.type);
    this.itemImagesToUploadArray.splice(index, 1, blob);
  }
}
