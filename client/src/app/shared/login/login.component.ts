import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
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
        

        if (!x.isPswChanged) {
          this.router.navigate(['resetPassword']);
        } else {
          this.router.navigate(['first']);
        }
      })

    } catch (err) {
      this.showSpinner = false;
      this.loginInvalid = true;

    }
  }


}
