import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  async tempSignUp(signUpType: string) {
    if (signUpType === "student") {
      const signup = await this.authService.createStudentAccount('test student 2', '123456', 'student@test.test', '2087');
    } else {
      const signup = await this.authService.createTeacherAccount('test teacher', '123456', 'teacher@test.test', 'My second Class');
    }
  }

}
