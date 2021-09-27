import { AuthValidators } from './../auth.validators';
import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup
  
  isLoading: boolean = true;
  showAlert: boolean = false;
  formStatus!: { message: string, status: 'success' | 'danger' };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'pass-group': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(7)]),
        'c-password': new FormControl(null, Validators.required),
      },  { validators: AuthValidators.confirmPass })
    })
  }
  
  onSignup(){
    if(this.form.valid) {
      this.authService.onSignup({
          email: this.form.get('email')?.value,
          password: this.form.get('pass-group.password')?.value
        }
      ).subscribe(
        _ => {
          this.isLoading = false;
          this.showAlert = true;
          this.formStatus = { message: 'Succesfully registered', status: 'success' }
          this.form.reset();
        },
        _ => {
          this.isLoading = false;
          this.showAlert = true;
          this.formStatus = { message: 'Failed registered', status: 'danger' }
        }
      )
    }else {
      this.showAlert = true;
      this.formStatus = { message: 'Invalid form.', status: 'danger' }
    }
  }
  confirmAlert() {    
    this.showAlert = false;
  }
}
