import { AbstractControl, ValidationErrors } from "@angular/forms";

export class AuthValidators {
    static confirmPass(controls: AbstractControl): ValidationErrors | null{
        const pass = controls.get('password');
        const cpass = controls.get('c-password');
        if((pass?.value || cpass?.value) && pass?.value !== cpass?.value) {
            return { confirmPass: true }
        }
        return null;
    }
}