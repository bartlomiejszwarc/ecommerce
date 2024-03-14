import { Injectable } from '@angular/core';

export interface IItem {
  userId: string;
  name: string;
  description: string;
  imagesArray: any[];
  price: number;
  isNew: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  createItem({ userId, name, description, imagesArray, price, isNew }: IItem): void {
    console.log(userId, name, description, imagesArray, price, isNew);
  }
}
