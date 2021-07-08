import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private firestore: AngularFirestore,
  ) {}

  companies: company[]

  async initCompanies() {
    this.companies = [];
    let company;

    let size = await this.firestore.collection('companies').get().toPromise().then(res => {
      return res.size
    });

    for (let i = 0; i < size; i++) {
      company = await this.firestore.collection('companies').doc<company>(i.toString())
      .get()
      .toPromise()
      .then(res => {
        return {
          name: res.data().name,
          bio: res.data().bio,
          priceDiff: res.data().priceDiff
        };
      })
      .catch(e => {
        console.log("Connot get Company Data: ", e);
        return null;
      });
      this.companies.push(company);
    }

    console.log("Company Data: ", this.companies);

  }

  // Used to automatically create companies
  // async createCompanies() {
  //   for (let i = 0; i < 7; i++) {
  //     await this.firestore.collection('companies').doc<company>(i.toString()).set({
  //       name: "",
  //       bio: "",
  //       priceDiff: [0, 0, 0, 0, 0]
  //     })
  //   }
  // }

  // TODO: Setup super-admin page to add or edit tool data


}
