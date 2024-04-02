import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

export interface IUser {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  createdAt: Date;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');

  async getUserDetailsById(uid: string): Promise<Observable<IUser | null>> {
    const q = query(this.usersCollection, where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    let userData: IUser | null = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        userData = doc.data() as IUser;
      });
      return of(userData);
    } else {
      return of(null);
    }
  }
}
