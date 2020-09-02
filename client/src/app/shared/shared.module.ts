import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';



import { RouterModule } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertComponent } from './alert/alert.component'

@NgModule({
  declarations: [NavbarComponent, FirstComponent, SecondComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    RouterModule,
    CustomMaterialModule
  ],
  exports:[NavbarComponent]
})
export class SharedModule { }
