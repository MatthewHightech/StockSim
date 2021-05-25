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

  async tempSignUp() {
    const signup = await this.authService.createStudentAccount('test user', '123456', 'test@test.test', 'ABCDEF');
  }

}
