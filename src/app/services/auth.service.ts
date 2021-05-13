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

  async createStudentAccount(username: string, password: string, email: string, classCode: string) {
    try {
      const newAccount = await this.auth.createUserWithEmailAndPassword(email, password);
      await this.firestore.collection('users').doc(newAccount.user.uid).set({
        username,
        classCode,
        budget: 100000,
        theme: 'default',
        transactions: []
      });
      console.log(`Created New User: ${username} in class: ${classCode}`);
    } catch (e) {
      return 'Error: ' + e;
    }
  }



}
