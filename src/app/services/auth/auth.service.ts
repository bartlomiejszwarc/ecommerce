import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  updatePassword,
} from '@angular/fire/auth';
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
  isDoneLoading = signal<boolean>(false);
  router = inject(Router);
  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.isDoneLoading.set(true);
      this.currentUser.set(user);
    });
  }

  firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  auth = inject(Auth);
  login({ email, password }: IUserCredentialsLogin) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async getCurrentUserData() {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        this.currentUser.set(user);
        observer.next(user);
      });
    });
  }

  async register({ email, displayName, password }: IUserCredentialsRegister): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password).then(async (response) => {
        if (response) {
          await updateProfile(response.user, {
            displayName: displayName,
          });
          const createdAt = new Date();
          const userId = response.user.uid;
          const data = { userId, email, displayName, createdAt };
          await addDoc(this.usersCollection, data);
          this.router.navigate(['/']);
          this.login({ email, password });
        }
      });
    } catch (e) {
      throw new Error('Invalid credentials');
    }
  }

  updatePassword(password: string) {
    if (this.currentUser()) return updatePassword(this.currentUser() as User, password);
    return null;
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
