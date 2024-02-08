import { Injectable } from '@angular/core';

interface IItem {
  userId: string;
  name: string;
  description: string;
  imagesArray: any[];
  price: number;
  isNew: boolean;
  availableQuantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  createItem({ userId, name, description, imagesArray, price, isNew, availableQuantity }: IItem): void {}
}
