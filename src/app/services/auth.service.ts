import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
  ) {}

  // creates account for student with email and password. Once that is approved and error free, a
  // user document is created in the firestore
  // params: username, password, email, classCode
  // return: either an error string from account creation, and error string from login, or a valid user object
  async createStudentAccount(username: string, password: string, email: string, classCode: string) {
    try {
      const newAccount = await this.auth.createUserWithEmailAndPassword(email, password);
          // CHECK IF CLASS CODE EXISTS (not a subscribe, just a 1 time read)
      // await this.firestore.collection('users').doc(newAccount.user.uid).set({
      //   username,
      //   classCode,
      //   budget: 100000,
      //   theme: 'default',
      //   transactions: []
      // });
      console.log('New Account Body: ', newAccount.additionalUserInfo);
      console.log(`Created New User: ${username} in class: ${classCode}`);
      return this.login(email, password);
    } catch (e) {
      return e.message;
    }
  }

  // logs user in and routes them to the root url (dashboard) which is protected by a route gaurd
  // (if the user doesn't have credentials they can't view the page)
  // params: email, password
  // return: either an error string or a valid user object
  async login(email: string, password: string) {
    try {
      const login = await this.auth.signInWithEmailAndPassword(email, password);
      console.log('Login Body: ', login);
      this.router.navigate(['/']);
      return login;
    } catch (e) {
      return e.message;
    }
  }
}
