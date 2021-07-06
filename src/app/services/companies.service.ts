import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  companies: company

  


}
