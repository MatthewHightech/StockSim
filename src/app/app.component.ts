import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CompaniesService } from './services/companies.service';
import { NewsService } from './services/news.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    public router: Router,
    public authService: AuthService,
    public userService: UserService,
    public companiesService: CompaniesService,
    public newsService: NewsService
    ) {
      router.events.subscribe(val => {
        if (val instanceof NavigationEnd) {
          //this.loadData();
        }
      })
    }

    async loadData() {
      const isStudent = await this.userService.isUserStudent()
      if (isStudent) {
        console.log("Loading student data...")
        await this.userService.initStudent();
        await this.companiesService.initCompanies();
        await this.newsService.initNews();
      } else if (isStudent == false) {
        console.log("Loading Teacher data...")
        await this.userService.initTeacher();
        // load class data
        // load student data
      }

      if (isStudent != null) {
        console.log("Loading Class data...")
        await this.userService.initClassroom();
      }else {
        console.log("Clearning data...")
        this.userService.clearData()
      }
    }
}
