import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { IItem } from '../item/item.service';

export interface IUser {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  createdAt: Date;
  location: string;
}

export interface IUpdateUserData {
  displayName: string;
  phoneNumber?: string;
  location?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  productsCollection = collection(this.firestore, 'products');

  async getUserDetailsById(uid: string): Promise<Observable<IUser | null>> {
    const q = query(this.usersCollection, where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    let userData: IUser | null = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        userData = doc.data() as IUser;
      });
      return of(userData);
    } else return of(null);
  }

  async getUserProducts(uid: string): Promise<IItem[] | null> {
    const q = query(this.productsCollection, where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    let productsArray: IItem[] = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        productsArray.push({ id, ...(doc.data() as IItem) });
      });
      return productsArray;
    } else return null;
  }

  async updateUserData(user: IUpdateUserData) {
    console.log(user);
  }
}
