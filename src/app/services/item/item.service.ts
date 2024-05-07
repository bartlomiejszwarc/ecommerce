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
  deleteDoc,
  collectionData,
  setDoc,
  updateDoc,
  CollectionReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
  DocumentSnapshot,
  QueryFieldFilterConstraint,
  QueryConstraint,
} from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes, deleteObject } from '@angular/fire/storage';
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

      const productsCollectionRef = collection(this.firestore, 'products');
      const productsStatsisticsCollectionRef = collection(this.firestore, 'productsStatistics');

      const productsCollectionSnapshot = await getDocs(productsCollectionRef);
      const productsStatisticsCollectionSnapshot = await getDocs(productsStatsisticsCollectionRef);

      if (productsCollectionSnapshot.empty) {
        const initialDocRef = doc(productsCollectionRef, 'products');
        await setDoc(initialDocRef, {});
      }
      if (productsStatisticsCollectionSnapshot.empty) {
        const initialDocRef = doc(productsStatsisticsCollectionRef, 'productsStatistics');
        await setDoc(initialDocRef, {});
      }

      const stats = await this.getCategoriesStats();
      const document = await this.getFirstDocumentFromCollection(this.productsStatisticsCollection);
      const docRef = doc(this.productsStatisticsCollection, document.id);
      var categoryStat;
      for (const [key, value] of Object.entries(stats)) {
        if (key === itemCategory) {
          categoryStat = value;
          break;
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

      getDocs(this.productsStatisticsCollection)
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
            const docRef = doc.ref;
            getDoc(docRef)
              .then((statsDoc: DocumentSnapshot<DocumentData>) => {
                const statsData = statsDoc.data();
                statsSubject.next(statsData as ICategoriesStats);
                resolve(statsSubject.getValue());
              })
              .catch((error) => {
                console.error('Error while fetching data:', error);
              });
          });
        })
        .catch((error) => {
          console.error('Error while fetching data:', error);
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

  async getProductsBySubcategory(subcategory: string, category: string): Promise<Observable<IItem[]>> {
    const items: IItem[] = [];
    const q = query(
      this.productsCollection,
      where('itemSubcategory', '==', subcategory),
      where('itemCategory', '==', category),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data() as IItem;
      items.push({ id, ...data });
    });
    return of(items);
  }

  async getProductsByKeyword(keyword: string): Promise<Observable<IItem[]>> {
    const items: IItem[] = [];
    const q = query(this.productsCollection, where('name', '>=', keyword), where('name', '<=', keyword + '\uf8ff'));

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

  async deleteItem(id: string, imagesUrls: string[], itemCategory: string): Promise<void> {
    const docRef = doc(this.firestore, 'products', id);
    imagesUrls.forEach(async (url) => {
      const fileRef = ref(this.storage, url);
      await deleteObject(fileRef).catch((e) => {});
    });

    const document = await this.getFirstDocumentFromCollection(this.productsStatisticsCollection);
    const docStatsRef = doc(this.productsStatisticsCollection, document.id);
    var categoryStat;
    const stats = await this.getCategoriesStats();
    for (const [key, value] of Object.entries(stats)) {
      if (key === itemCategory) {
        categoryStat = value;
      }
    }
    if (categoryStat) {
      const statIncremented = Number(categoryStat) - 1;
      const data = {
        [itemCategory]: statIncremented,
      };
      await updateDoc(docStatsRef, data);
      await deleteDoc(docRef).catch((e) => {});
    }
  }
}
