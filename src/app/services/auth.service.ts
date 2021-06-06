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
      let err = await this.isValid(username, undefined, classCode);
      if (err != undefined) {
        console.log("Error: ", err)
        return
      }

      const newAccount = await this.auth.createUserWithEmailAndPassword(email, password);

      await this.firestore.collection('students').doc(newAccount.user.uid).set({
        classCode,
        budget: 100000,
        theme: 'default',
        transactions: []
      });

      await this.firestore.collection('students').doc(newAccount.user.uid).collection('public').doc('info').set({
        username
      });

      return this.login(email, password);
    } catch (e) {
      return e.message;
    }
  }

  // creates account for student with email and password. Once that is approved and error free, a
  // user document is created in the firestore
  // params: username, password, email, className
  // return: either an error string from account creation, and error string from login, or a valid user object
  async createTeacherAccount(username: string, password: string, email: string, className: string) {
    try {
      let err = await this.isValid(username, className, undefined);
      if (err != undefined) {
        console.log("Error: ", err)
        return
      }

      const newAccount = await this.auth.createUserWithEmailAndPassword(email, password);
      const newClassCode = this.newClassCode();
      const teacherDoc = await this.firestore.collection('teachers').doc(newAccount.user.uid).set({
        username,
        classCode: newClassCode
      }).then(res => {
        console.log("res ", res)
      })
      .catch(e => {
        console.log("error ", e)
      });

      await this.firestore.collection('classrooms').doc(newClassCode.toString()).set({
        classStartDate: Date.now()
      }).then(res => {
        console.log("res ", res)
      })
      .catch(e => {
        console.log("error ", e)
      });

      await this.firestore.collection('classrooms').doc(newClassCode.toString()).collection('public').doc('code').set({
        className,
        classCode: newClassCode,
      }).then(res => {
        console.log("res ", res)
      })
      .catch(e => {
        console.log("error ", e)
      });

      return this.login(email, password);
    } catch (e) {
      return e.message;
    }
  }

  // logs user in and routes them to the root url (dashboard) which is protected by a route gaurd
  // (if the user doesn't have credentials they can't view the page)
  // when a user is logged in, their credentials are stored in the browser cache for auto-login on future website visits.
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

  // logs the user out and routes them back to the auth page. This is the only way to remove the login credentials from cache
  // return: either an error string or a valid logout object
  async logout() {
    try {
      const logout = await this.auth.signOut();
      this.router.navigate(['/', 'auth']);
      return logout;
    } catch (e) {
      return e.message;
    }
  }

  // helper functions

  // params: username, possible classname or undefined, possible classcode or undefined
  // return: undefined if all params are valid, or an error string of the first invalid param.
  async isValid(username: string, className?: string, classCode?: string) {
    // searches users collection for username equal to search key
    let avalible = await this.avalibleInFirestore('username', username);
    if (!avalible) {
      return "Username is taken";
    }

    if (className !== undefined) {
      avalible = await this.avalibleInFirestore('className', className);
      if (!avalible) {
        return "ClassName is taken";
      }
    } else if (classCode !== undefined) {
      let doesNotExist = await this.avalibleInFirestore('classCode', parseInt(classCode));
      console.log("Query")
      if (doesNotExist) {
        return "Class Code doesn't exist";
      }
    }

    return undefined
  }

  // params: firebase collection name, firebase field name, query to search for
  // return: boolean. True if the query is NOT found (it's avalible) and false if it exists.
  async avalibleInFirestore(field: string, query: any) {
    const avalible = await this.firestore.collectionGroup("public", ref => ref.where(field, '==', query))
    .get()
    .toPromise()
    .then((res) => {
      console.log("RES: ", res)
      if (res.empty) {
        return true;
      } else {
        return false;
      }
    })
    .catch(e => {
      console.log("Query: " + query + "  -  ERROR: ", e)
    });

    return avalible;
  }

  newClassCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

}



