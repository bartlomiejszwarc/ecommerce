import { Injectable, effect, inject } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IItem } from '../item/item.service';
import { AuthService } from '../auth/auth.service';

export interface IUser {
  favorites: any;
  id?: string;
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
  authService = inject(AuthService);
  usersCollection = collection(this.firestore, 'users');
  productsCollection = collection(this.firestore, 'products');

  userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  setUser(user: IUser | null) {
    this.userSubject.next(user);
  }

  getUser(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

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

  async addToFavorites(itemId: string) {
    const user = this.userSubject.getValue();
    const q = query(this.usersCollection, where('userId', '==', user!.userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDataFromDatabase = querySnapshot.docs[0].data() as IUser;
      const userRef = querySnapshot.docs[0];
      if (userRef) {
        const docRef = doc(this.usersCollection, userRef.id);
        if (userDataFromDatabase.favorites) {
          const favoritesArray = Array.from(userDataFromDatabase.favorites);
          favoritesArray.push(itemId);
          const data = {
            favorites: favoritesArray,
          };

          await updateDoc(docRef, data);
          const user = this.userSubject.getValue();
          user!.favorites = favoritesArray;
          this.userSubject.next(user);
        } else {
          const favoritesArray = [];
          favoritesArray.push(itemId);
          const data = {
            favorites: favoritesArray,
          };

          await updateDoc(docRef, data);
          const user = this.userSubject.getValue();
          user!.favorites = favoritesArray;
          this.userSubject.next(user);
        }
      }
    }
  }
  async removeFromFavorites(itemId: string) {
    const user = this.userSubject.getValue();
    const q = query(this.usersCollection, where('userId', '==', user!.userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDataFromDatabase = querySnapshot.docs[0].data() as IUser;
      const userRef = querySnapshot.docs[0];
      if (userRef) {
        const docRef = doc(this.usersCollection, userRef.id);
        if (userDataFromDatabase.favorites) {
          const favoritesArray = Array.from(userDataFromDatabase.favorites);
          const favoritesArrayUpdated = favoritesArray.filter((id) => id !== itemId);
          const data = {
            favorites: favoritesArrayUpdated,
          };
          const user = this.userSubject.getValue();
          user!.favorites = favoritesArrayUpdated;
          this.userSubject.next(user);
          await updateDoc(docRef, data);
        }
      }
    }
  }

  async updateUserData(user: IUpdateUserData): Promise<Observable<any>> {
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
        return of(data);
      }
    }
    return of(null);
  }
}
