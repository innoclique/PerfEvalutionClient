

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  public hide=true;
  public pswHide=true;
  showSpinner: boolean;
  formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {

    this.resetForm = this.fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: this.ConfirmedValidator('password', 'confirm_password')
    })

  }

  get f(){
    return this.resetForm.controls;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }


  async onSubmit() {
    
    this.formSubmitAttempt = true;

    if (this.resetForm.invalid) {
      return false;
    }
    try {
      this.showSpinner = true;
      const user = this.authService.getLSObject('user');

      const password = this.resetForm.get('password').value;
      const resetModel = {userId : user.ID, password: password};
      await this.authService.updatePassword(resetModel).subscribe(x => {
        
        this.router.navigate(['first']);
      })

    } catch (err) {
      this.showSpinner = false;

    }
  }


}

