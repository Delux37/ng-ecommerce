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
 
  constructor(private authService: AuthService) {  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
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
        }
      )
    }
  }
}
