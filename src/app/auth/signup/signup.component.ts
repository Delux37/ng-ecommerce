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
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'c-password': new FormControl(null, Validators.required),
    })
  }
  
  onSignup(){
    if(this.form.valid) {
      this.authService.onSignup({
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value
        }
      ).subscribe(
        res => {
          console.log(res);
          this.isLoading = false;
          this.showAlert = true;
          this.formStatus = { message: 'Succesfully registered', status: 'success' }
        },
        _ => {
          this.isLoading = false;
          this.showAlert = true;
          this.formStatus = { message: 'Failed registered', status: 'danger' }
        }
      )
    }
  }
}
