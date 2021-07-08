import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { article } from '../models/article.model';
import { newspaper } from '../models/newspaper.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private firestore: AngularFirestore,
  ) {}

  newspapers: newspaper[]

  async initNews() {
    this.newspapers = [];
    let newspaper;

    let size = await this.firestore.collection('news').get().toPromise().then(res => {
      return res.size
    });

    for (let i = 0; i < size; i++) {
      newspaper = await this.firestore.collection('news').doc<newspaper>(i.toString())
      .get()
      .toPromise()
      .then(res => {
        return {
          videoLink: res.data().videoLink,
          articles: res.data().articles
        };
      })
      .catch(e => {
        console.log("Connot get News Data: ", e);
        return null;
      });
      this.newspapers.push(newspaper);
    }

    console.log("News Data: ", this.newspapers);

  }

  // Used to automatically create companies
  // async createCompanies() {
  //   for (let i = 0; i < 5; i++) {
  //     await this.firestore.collection('news').doc<newspaper>(i.toString()).set({
  //       videoLink: "",
  //       articles: [
  //         {
  //           title: "",
  //           content: ""
  //         },
  //         {
  //           title: "",
  //           content: ""
  //         },
  //       ]
  //     });
  //   }
  // }

  // TODO: Setup super-admin page to add or edit tool data
}
