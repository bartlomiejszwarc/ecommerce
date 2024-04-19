import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  collectionData,
  setDoc,
  updateDoc,
  CollectionReference,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { BehaviorSubject, Observable, from, map, of } from 'rxjs';

// export interface ICategoriesStats {
//   Electronics?: number;
//   Sports?: number;
//   Music?: number;
//   'Video games'?: number;
//   'Home and garden'?: number;
//   'Clothes and fashion'?: number;
// }
export interface ICategoriesStats {
  itemCategory?: string;
}
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
  createdAt: Date;
  isSalePrivate: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}
  firestore = inject(Firestore);
  storage = inject(Storage);
  productsCollection = collection(this.firestore, 'products');
  productsStatisticsCollection = collection(this.firestore, 'productsStatistics');

  async createItem({
    userId,
    name,
    description,
    imagesArray,
    price,
    isNew,
    itemCategory,
    itemSubcategory,
    createdAt,
    isSalePrivate,
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
          imagesUrls[index] = downloadUrl;
        }),
      );

      const itemToCreate = {
        userId,
        name,
        description,
        imagesUrls,
        price,
        isNew,
        itemCategory,
        itemSubcategory,
        createdAt,
        isSalePrivate,
      };

      const stats = await this.getCategoriesStats();
      const document = await this.getFirstDocumentFromCollection(this.productsStatisticsCollection);
      const docRef = doc(this.productsStatisticsCollection, document.id);
      var categoryStat;
      for (const [key, value] of Object.entries(stats)) {
        if (key === itemCategory) {
          categoryStat = value;
        }
      }
      if (categoryStat) {
        const statIncremented = Number(categoryStat) + 1;
        const data = {
          [itemCategory]: statIncremented,
        };
        await updateDoc(docRef, data);
      } else {
        const data = {
          [itemCategory]: 1,
        };
        await updateDoc(docRef, data);
      }

      const promise = addDoc(this.productsCollection, itemToCreate).then((res) => res);

      return from(promise);
    } catch (e) {
      return from('Error');
    }
  }

  async getCategoriesStats(): Promise<ICategoriesStats> {
    return new Promise((resolve) => {
      const statsSubject = new BehaviorSubject<ICategoriesStats>({});
      collectionData(this.productsStatisticsCollection).subscribe((data) => {
        statsSubject.next(data[0]);
        resolve(statsSubject.getValue());
      });
    });
  }

  async getFirstDocumentFromCollection(collection: CollectionReference): Promise<QueryDocumentSnapshot> {
    return new Promise(async (resolve) => {
      await getDocs(collection).then((docs) => {
        resolve(docs.docs[0]);
      });
    });
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

  async getItemById(id: string): Promise<Observable<IItem | null>> {
    const docRef = doc(this.firestore, 'products', id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const item = docSnapshot.data() as IItem;
      return of({ id, ...item });
    } else {
      return of(null);
    }
  }
}
