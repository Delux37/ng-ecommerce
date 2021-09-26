import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  //errors handling
  showAlert: boolean = false;
  formStatus!: { message: string, status: 'success' | 'danger' };
 
  constructor(private authService: AuthService) {  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(7)]),
    })
  }
  
  onLogin(){
    if(this.form.valid) {
      this.authService.onLogin({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }).subscribe(
        res => {
          this.authService.createCurrUser(
            res.email,
            res.idToken,
            res.expiresIn,
            res.FBid,
            res.isAdmin
          )
          this.form.reset();
        },
        (errorMessage: string) => {
          this.showAlert = true;
          this.formStatus = { message: 'Failed to login unknown error.', status: 'danger' }
          switch(errorMessage){
            case 'INVALID_EMAIL':
            case 'INVALID_PASSWORD': 
              this.formStatus.message = 'Invalid password or meail'
              break;
          }
          
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
