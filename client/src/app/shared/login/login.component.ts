import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import {AlertDialog} from '../../Models/AlertDialog';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  showSpinner: boolean;
  public alert:AlertDialog;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public themeService:ThemeService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.alert=new AlertDialog();
  }
  async onSubmit() {
    
    this.formSubmitAttempt = true;

    if (this.loginForm.invalid) {
      this.loginInvalid = true;
      return false;
    }
    try {
      this.showSpinner = true;
      const email = this.loginForm.get('username').value;

      const password = this.loginForm.get('password').value;
      const LoginModel = {Email : email, Password: password};
      await this.authService.login(LoginModel).subscribe(x => {
        debugger
this.router.navigate(['first']);
      },error=>{
        debugger
        
      this.openDialog()
      
      })

    } catch (err) {
      debugger
      this.openDialog()
      this.showSpinner = false;
      this.loginInvalid = true;

    }
  }

  openDialog() {   
    this.alert.Title="Show Me ";
    this.alert.Content="Already loggedin";
    this.alert.ShowCancelButton=false;
    this.alert.ShowConfirmButton=true;
    this.alert.CancelButtonText="Cancel";
    this.alert.ConfirmButtonText="Logout";
    this.alert.Theme=this.themeService.isDarkTheme?'dark-theme':''
    const dialogConfig=new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
dialogConfig.data=this.alert;
dialogConfig.width="250px;"
dialogConfig.panelClass= 'custom-dialog';

    this.dialog.open(AlertComponent, dialogConfig);
}
}
