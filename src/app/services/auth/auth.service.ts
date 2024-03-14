import { Injectable, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
  auth = inject(Auth);
  login({ email, password }: IUserCredentialsLogin) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  async register({ email, displayName, password }: IUserCredentialsRegister): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((user: any) => {
      user.user.updateProfile({
        displayName: displayName,
      });
    });
  }

  logout() {
    return this.fireAuth.signOut();
  }
}
