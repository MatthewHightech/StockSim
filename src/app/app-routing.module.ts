import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { AdminGaurd } from './gaurds/admin.gaurd';
import { StudentGaurd } from './gaurds/student.gaurd';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectToDashboard = () => redirectLoggedInTo(['']);
// ADD CUSTOM AUTH GAURD FOR ADMIN PAGE
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule),
    ...canActivate(redirectToDashboard)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [StudentGaurd]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AdminGaurd]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
