import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module'
import { SecondComponent } from './shared/second/second.component';
import { FirstComponent } from './shared/first/first.component';
import { Routes, RouterModule, ROUTES } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
const appRoutes: Routes = [
  { path: '', component: AppComponent, data: { title: 'First Component' } },
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' }},
  { path: 'login', component: LoginComponent, data: { title: 'Second Component' }},
  { path: 'forgotPassword', component: ForgotPasswordComponent, data: { title: '' }},
  { path: 'resetPassword', component: ResetPasswordComponent, data: { title: '' }}
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CustomMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
