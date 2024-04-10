import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { IItem } from '../item/item.service';

export interface IUser {
  uid: string;
  userId: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  createdAt: Date;
  location: string;
}

export interface IUpdateUserData {
  userId: string;
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

  async addToFavorites(uid: string, itemId: string) {
    var userRef;
    const q = query(this.usersCollection, where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        userRef = doc;
      });
      if (userRef) {
        const docRef = doc(this.usersCollection, userRef['id']);
        const data = {
          location: itemId,
        };
        await updateDoc(docRef, data);
      }
    }
  }

  async updateUserData(user: IUpdateUserData) {
    const q = query(this.usersCollection, where('userId', '==', user.userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDataFromDatabase = querySnapshot.docs[0].data() as IUser;
      const userRef = querySnapshot.docs[0];
      if (userRef) {
        const docRef = doc(this.usersCollection, userRef.id);
        const data = {
          displayName: user.displayName ? user.displayName : userDataFromDatabase.displayName,
          location: user.location ? user.location : userDataFromDatabase.location,
          phoneNumber: user.phoneNumber ? user.phoneNumber : userDataFromDatabase.phoneNumber,
        };
        await updateDoc(docRef, { ...data });
      }
    }
  }
}
