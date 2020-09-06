import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { AlertDialog } from '../../Models/AlertDialog';
import { ThemeService } from 'src/app/services/theme.service';
import { Constants } from '../AppConstants';
import { NotificationService } from '../../services/notification.service';
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
  public alert: AlertDialog;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public themeService: ThemeService,
    private snack: NotificationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.alert = new AlertDialog();
  }
  /**Login Submit */
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
      const LoginModel = { Email: email, Password: password };
      await this.authService.login(LoginModel).subscribe(x => {

        if (!x.IsPswChangedOnFirstLogin) {
          this.router.navigate(['resetPassword']);
        } else {
          this.router.navigate(['first']);
        }
        
      }, error => {
        if (error.message === Constants.DuplicateSession) {
          this.openDialog()
        } if (error.message === Constants.InvalidCredentials) {

        }
        this.snack.error('Invalid Credentials')
        this.showSpinner = false;
      })

    } catch (err) {
      this.snack.error(err.message)
      this.showSpinner = false;
    }


  }

  /**To alert user for duplicate sessions */
  openDialog() {
    this.alert.Title = "Secure Alert";
    this.alert.Content = "We found that you have already logged in some where. Please logout from other session, to continue click on logout";
    this.alert.ShowCancelButton = false;
    this.alert.ShowConfirmButton = true;
    this.alert.CancelButtonText = "Cancel";
    this.alert.ConfirmButtonText = "Logout";


    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.alert;
    dialogConfig.height = "300px";
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';


    var dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(resp => {
      this.authService.LogOut()
      console.log('alert dialog', resp);
    })
  }
}
