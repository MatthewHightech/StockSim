import { Injectable } from '@angular/core';
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
  ) {}

  student: student
  teacher: teacher

  initStudent() {

    console.log("Student Data: ", this.student);
  }

  initTeacher() {

    console.log("Teacher Data: ", this.teacher);
  }

}
