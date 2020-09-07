

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
  passwordFarmat="";
  has8char=false;
  hasUppercase=false;
  hasLowercase=false;
  hasNumber=false;
  hasSpecialChar=false;
  strength: string;
  showValidations: boolean;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {

    this.resetForm = this.fb.group({
      password: ['',[
      Validators.required]],
      confirm_password: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]]
    }, { 
      validator: [this.ConfirmedValidator('password', 'confirm_password'),this.ConfirmPattern('password')]
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

  onNewPasswordCick(){
    this.showValidations=true;
  }

  ConfirmPattern(controlName: string) {
    
   
    return (formGroup: FormGroup) => {
      this.passwordFarmat="";
      this.passwordFarmat="Must be at least "
      const control = formGroup.controls[controlName];
      var passw = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]))/;

      var number = /(?=.*\d)/;
      var small =   /(?=.*[a-z])/;
      var big =  /(?=.*[A-Z])/;
      var spl =  /(?=.*[#$_-])/;

     
      if (control.value.length <8 ){
        this.passwordFarmat= this.passwordFarmat+"8 Characters "
        control.setErrors({ confirmPattern: true });
        this.has8char=false;
      }else this.has8char=true;

      if (!control.value.match(number)) {
        this.passwordFarmat= this.passwordFarmat+"one Number "
        control.setErrors({ confirmPattern: true });
        this.hasNumber=false;
      }else this.hasNumber=true;

      if (!control.value.match(small)) {
        this.passwordFarmat= this.passwordFarmat+"one in Small Case "
        control.setErrors({ confirmPattern: true });
        this.hasLowercase=false;
      }else this.hasLowercase=true;

      if (!control.value.match(big)) {
        this.passwordFarmat=  this.passwordFarmat+"one in Capital Case "
        control.setErrors({ confirmPattern: true });
        this.hasUppercase=false;
      }else this.hasUppercase=true;
      if (!control.value.match(spl)) {
        this.passwordFarmat=  this.passwordFarmat+"one of these Special Character(# $ _ - )"
        control.setErrors({ confirmPattern: true });
        this.hasSpecialChar=false;
      }else this.hasSpecialChar=true;

      var number = /(?=.*\d)/;
      var small =   /(?=.*[a-z])/;
      var big =  /(?=.*[A-Z])/;
      var spl =  /(?=.*[#$_-])/;
      var splCount = (control.value.match(/([#$_-])/g) || []).length;
      var numberCount = (control.value.match(/\d/g) || []).length;
      // var smallCount = (control.value.match(/(?=.*[a-z])/g) || []).length;
      // var numberCount = (control.value.match(/(?=.*\d)/g) || []).length;

      if ( control.value.length>=8&& splCount>=1 && numberCount>=1) {
        this.strength ='Weak';
      }  
      if (control.value.length>=10 && splCount>=2 && numberCount>=2) {
        this.strength="Medium";
      }
       if (control.value.length>=12 &&  splCount>=3 && numberCount>=3) {
        this.strength="Strong";
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
      const oldPassword = this.resetForm.get('oldPassword').value;
      const resetModel = {userId : user.ID, password: password};
      await this.authService.updatePassword(resetModel).subscribe(x => {
        
        this.router.navigate(['first']);
      })

    } catch (err) {
      this.showSpinner = false;

    }
  }


}

