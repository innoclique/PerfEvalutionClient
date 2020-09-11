import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FirstComponent } from './shared/first/first.component';

import { LoginComponent } from './shared/login/login.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { SecondComponent } from './shared/second/second.component';
const routes: Routes = [
  {path:'',redirectTo:'first',pathMatch:'full'},
  
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' }},
  { path: 'login', component: LoginComponent, data: { title: 'Second Component' }},
  { path: 'forgotPassword', component: ForgotPasswordComponent, data: { title: '' }},
  { path: 'resetPassword', component: ResetPasswordComponent, data: { title: '' }},
  {
    path: 'psa',
    loadChildren: () => import(`./psa/psa.module`).then(m => m.PSAModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
