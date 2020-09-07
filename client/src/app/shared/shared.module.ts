import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';



import { RouterModule } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertComponent } from './alert/alert.component';

import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [NavbarComponent, 
    FirstComponent, 
    SecondComponent, 
    LoginComponent, 
    ForgotPasswordComponent, 
    ResetPasswordComponent,
    AlertComponent,
    MatSpinnerOverlayComponent
    ],
  imports: [    
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,    
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CustomMaterialModule
  ],
  entryComponents:[],
  exports:[NavbarComponent,AlertComponent]
})
export class SharedModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}