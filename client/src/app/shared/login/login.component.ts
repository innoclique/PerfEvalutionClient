import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
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
  constructor(private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }
 async onSubmit() {
   debugger
this.formSubmitAttempt=true;

if(this.loginForm.invalid){
  this.loginInvalid=true;
  return false;
}
try {
  
          const Email = this.loginForm.get('username').value;
  
          const Password = this.loginForm.get('password').value;
  
          await this.authService.login({Email, Password});
  
        } catch (err) {
  
          this.loginInvalid = true;
  
        }
  }


}
