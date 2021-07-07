import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { student } from '../models/student.model';
import { teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  student: student;
  teacher: teacher;

  async initStudent() {
    const userID = (await this.auth.currentUser).uid;

    this.student = await this.firestore.collection('students').doc<student>(userID)
    .get()
    .toPromise()
    .then(async res => {
      return {
        username: await this.getUsername('students', userID),
        budget: res.data().budget,
        theme: res.data().theme,
        classCode: res.data().classCode,
        transactions: res.data().transactions
      };
    })
    .catch(e => {
      console.log("Connot get Student Data: ", e);
      return null;
    });

    console.log("Student Data: ", this.student);
  }

  async initTeacher() {
    const userID = (await this.auth.currentUser).uid;

    this.teacher = await this.firestore.collection('teachers').doc<teacher>(userID)
    .get()
    .toPromise()
    .then(async res => {
      return {
        username: await this.getUsername('teachers', userID),
        classCode: res.data().classCode
      }
    })

    console.log("Teacher Data: ", this.teacher);
  }

  // helper functions

  async isUserStudent() {
    if (await this.auth.currentUser == null) {
      return null
    }
    const userID = (await this.auth.currentUser).uid;
    let isStudent = null;
    isStudent = await this.firestore.collection("students", ref => ref.where("__name__", '==', userID))
    .get()
    .toPromise()
    .then(res => {
      if (!res.empty) {
        return true
      } else {
        return false
      }
    }).catch(e => {
      return e;
    });

    return isStudent
  }

  async getUsername(collection, userID) {

    return await this.firestore.collection(collection).doc(userID).collection('public').doc<{username: string}>('info')
    .get()
    .toPromise()
    .then(info => {
      return info.data().username;
    }).catch(e => {
      console.log("Cannot find user: ", e);
      return "Cannot get Username";
    })
  }

}
