

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPswForm: FormGroup;
  private formSubmitAttempt: boolean;
  showSpinner: boolean;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.forgotPswForm = this.fb.group({
      email: ['', Validators.email],
    });
  }

  get f() {
    return this.forgotPswForm.controls;
  }
  async onSubmit() {

    this.formSubmitAttempt = true;

    if (this.forgotPswForm.invalid) {
      return false;
    }
    try {
      this.showSpinner = true;
      const email = this.forgotPswForm.get('email').value;

      const resetModel = { Email: email };
      await this.authService.resetPassword(resetModel).subscribe(x => {

        this.router.navigate(['login']);
      })

    } catch (err) {
      this.showSpinner = false;

    }
  }


}

