import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-alert',
  templateUrl: './auth-alert.component.html',
  styleUrls: ['./auth-alert.component.scss']
})
export class AuthAlertComponent {
  @Input() formStatus!: { message: string, status: 'success' | 'danger' }; 
  @Output() closeAlert = new EventEmitter();

  onCloseAlert() {
    this.closeAlert.emit();
  }
  constructor() { }

}
