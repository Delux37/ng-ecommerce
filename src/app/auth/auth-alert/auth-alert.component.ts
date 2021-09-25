import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-alert',
  templateUrl: './auth-alert.component.html',
  styleUrls: ['./auth-alert.component.scss']
})
export class AuthAlertComponent {
  @Input() formStatus!: { message: string, status: 'success' | 'danger' }; 

  constructor() { }

}
