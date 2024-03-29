import { Component, NgZone, ViewChild, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  itemName: string = 'This is my first product';
  itemNameMaxLength: number = 100;
  itemDescription: string =
    'This is a description of my first product. This is a description of my first product. This is a description of my first product. This is a description of my first product. This is a description of my first product. This is a description of my first product. This is a description of my first product. This is a description of my first product. This is a description of my first product. ';
  itemDescriptionMaxLength: number = 1000;
  itemImagesArray: any[] = [];
  itemImagesArrayMaxLength: number = 3;
  array = Array.from({ length: this.itemImagesArrayMaxLength }, (_, index) => index);
  itemPrice: number = 21.37;
  itemIsNew: boolean = false;
  itemCategory: string = '';
  itemSubcategory: string = '';
  currentCategory: any;

  categories: ICategory[] = categories;

  onCreateItem = async () => {
    const userId = this.authService.currentUser()?.uid;

    const data: IItem = {
      userId: userId!,
      name: this.itemName,
      description: this.itemDescription,
      imagesArray: this.itemImagesArray,
      price: this.itemPrice,
      isNew: this.itemIsNew,
      itemCategory: this.itemCategory,
      itemSubcategory: this.itemSubcategory,
    };
    this.itemService.createItem(data);
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

  pushImageToArray(image: any, index: number) {
    const file = URL.createObjectURL(image);
    this.itemImagesArray.splice(index, 1, file);
  }
}
