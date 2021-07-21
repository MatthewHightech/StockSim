import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { classroom } from '../models/classroom.model';
import { student } from '../models/student.model';
import { teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  student: student;
  teacher: teacher;
  classroom: classroom;

  classCode: number;
  day: number;

  // initiation of data

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
    this.classCode = this.student.classCode
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
    this.classCode = this.teacher.classCode
    console.log("Teacher Data: ", this.teacher);
  }

  // classroom

  async initClassroom() {
    if (this.classCode != undefined) {
      this.classroom = await this.firestore.collection('classrooms').doc<classroom>(this.classCode.toString())
      .get()
      .toPromise()
      .then(async res => {
        return {
          classStartDate: new Date(res.data().classStartDate),
          className: await this.getUsername('classrooms', this.classCode),
          classCode: this.classCode
        }
      })
    } else {
      console.log("Error, classcode undefined")
    }
    console.log("Classroom Data: ", this.classroom);
    this.day = this.getDaysPassed(this.classroom.classStartDate.getDate(), new Date(Date.now()).getDate(), this.classroom.classStartDate.getMonth(), this.classroom.classStartDate.getFullYear());
    console.log(this.day)
  }

  // time and day

  getDaysPassed(startDay, day, month, year) {
    let daysPassed

    if (startDay > day) {
      daysPassed = day + (this.getDaysInMonth(month, year) - startDay);
    } else {
      daysPassed = day - startDay;
    }
    return daysPassed+1
  }

  getDaysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
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
    });
  }

  clearData() {

  }

  async resetUser() {
    const userID = (await this.auth.currentUser).uid;
    if (this.student != undefined) {
      this.firestore.collection('students').doc(userID).set({
        budget: 100000,
        theme: 'default',
        transactions: [],
      });
    }
  }

}
