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
import { MatRadioModule } from '@angular/material/radio';

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
    MatRadioModule,
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
  itemImagesArrayMaxLength: number = 3;
  array = Array.from({ length: this.itemImagesArrayMaxLength }, (_, index) => index);
  itemPrice: number = 0;
  itemIsNew: boolean = false;

  onCreateItem = async () => {
    const userId = this.authService.currentUser()?.uid;

    const data: IItem = {
      userId: userId!,
      name: this.itemName,
      description: this.itemDescription,
      imagesArray: this.itemImagesArray,
      price: this.itemPrice,
      isNew: this.itemIsNew,
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
}
