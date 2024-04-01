import { Injectable, inject } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  firestore = inject(Firestore);
  productsCollection = collection(this.firestore, 'users');
}
