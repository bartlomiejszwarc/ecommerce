import { Injectable } from '@angular/core';

export interface IItem {
  userId: string;
  name: string;
  description: string;
  imagesArray: string[];
  price: number;
  isNew: boolean;
  itemCategory: string;
  itemSubcategory: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  createItem({ userId, name, description, imagesArray, price, isNew, itemCategory, itemSubcategory }: IItem): void {
    console.log(userId, name, description, imagesArray, price, isNew, itemCategory, itemSubcategory);
  }
}
