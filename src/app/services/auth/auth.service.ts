import { Injectable, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

interface IUserCredentialsLogin {
  email: string;
  password: string;
}
interface IUserCredentialsRegister {
  email: string;
  displayName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);
  constructor(private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
      // if (this.currentUser()) {
      //   this.router.navigate(['/home']);
      // } else {
      //   this.router.navigate(['/']);
      // }
    });
  }

  fireAuth = inject(AngularFireAuth);
  firestore = inject(Firestore);
  usersCollection = collection(this.firestore, '/users');
  auth = inject(Auth);
  login({ email, password }: IUserCredentialsLogin) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  async getCurrentUserData() {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });
  }

  async register({ email, displayName, password }: IUserCredentialsRegister): Promise<any> {
    try {
      const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        await user.updateProfile({
          displayName: displayName,
        });
        const createdAt = new Date();
        const userId = user.uid;
        const data = { userId, email, displayName, createdAt };
        await addDoc(this.usersCollection, data);
      }
    } catch (e) {}
  }

  logout() {
    return this.fireAuth.signOut();
  }
}
