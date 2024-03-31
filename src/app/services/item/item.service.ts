import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { addDoc } from 'firebase/firestore';
import { Observable, from, of } from 'rxjs';

export interface IItem {
  id?: string;
  userId: string;
  name: string;
  description: string;
  imagesArray: Blob[];
  imagesUrls: string[] | null;
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
  firestore = inject(Firestore);
  storage = inject(Storage);
  productsCollection = collection(this.firestore, 'products');

  async createItem({
    userId,
    name,
    description,
    imagesArray,
    price,
    isNew,
    itemCategory,
    itemSubcategory,
  }: IItem): Promise<Observable<any>> {
    //
    try {
      const imagesUrls: string[] = [];
      await Promise.all(
        imagesArray.map(async (image, index) => {
          const filePath = `images/${userId}/${new Date().getTime()}/${index}`;
          const storageRef = ref(this.storage, filePath);
          const uploadTask = await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(uploadTask.ref);
          imagesUrls.push(downloadUrl);
        }),
      );
      //
      const itemToCreate = { userId, name, description, imagesUrls, price, isNew, itemCategory, itemSubcategory };
      const promise = addDoc(this.productsCollection, itemToCreate).then((res) => res);
      return from(promise);
    } catch (e) {
      return from('Error');
    }
  }

  async getProductsBySubcategory(subcategory: string): Promise<Observable<IItem[]>> {
    const items: IItem[] = [];
    const q = query(this.productsCollection, where('itemSubcategory', '==', subcategory));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data() as IItem;
      items.push({ id, ...data });
    });
    return of(items);
  }

  async getProductsByCategory(category: string): Promise<Observable<IItem[]>> {
    const items: IItem[] = [];
    const q = query(this.productsCollection, where('itemCategory', '==', category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data() as IItem;
      items.push({ id, ...data });
    });
    return of(items);
  }
}
