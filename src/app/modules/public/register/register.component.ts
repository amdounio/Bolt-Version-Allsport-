import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../../../core/models/form-fields.model';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailRegex } from '../../../shared/constant';
import { GoogleOAuthDto } from '../../../core/models/google-auth.dto';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  images: string[] = [
    "assets/images/stadium.png",
    "assets/images/stadium.png",
    "assets/images/stadium.png"
  ]
  title : string = "Create an account"
  subTitle : string = "Describe yourself as clearly so that there are no mistakes."
  errorMessages : string[] = []
  form!: FormGroup;
  formFields: FormField[] = [
    { fieldName: 'firstname', validators: [Validators.required], value: '' },
    { fieldName: 'lastname', validators: [Validators.required], value: '' },
    { fieldName: 'email', validators: [Validators.required, Validators.pattern(emailRegex)], value: '' },
    { fieldName: 'password', validators: [Validators.required, Validators.minLength(8)], value: '' },
    { fieldName: 'confirmation', validators: [Validators.required, Validators.minLength(8)], value: '' },
    { fieldName: 'acceptLegalPolicy', validators: [], value: 'true' },
  ]
  functionsValidators: any[] = []
  constructor(private notificationService: NotificationService, private authenticationService : AuthenticationService) {}

  ngOnInit(): void {
    this.buildForm()
  }


  buildForm() {
    return new Promise((resolve) => {
      const controls: any = {};
      this.formFields.forEach((field: FormField) => {
        controls[field.fieldName] = new FormControl({ value: field.value, disabled: field.disabled }, field.validators);
      })

      if (this.functionsValidators.length === 0) {
        this.form = new FormGroup(controls);
      } else {
        this.form = new FormGroup(controls, this.functionsValidators);
      }
      resolve(this.form);
    });
  }

  createObject(): GoogleOAuthDto {
    const entity: User = <User>{}
    this.formFields.forEach((field) => {
      // @ts-ignore
      entity[field.fieldName] = this.form.get(field.fieldName)?.value || null;
    });
    return entity as GoogleOAuthDto;
  }


  logFormErrors() {
    this.errorMessages = [];
    this.formFields.forEach(field => {
      const control = this.form.get(field.fieldName);
      if (control && control.errors) {
        this.errorMessages.push(this.getErrorMessage(control, field.fieldName));
      }
    });
  }

  getErrorMessage(control: AbstractControl, field: string): string {
    if (control.errors?.['required']) {
      return `${field} is required.`;
    }
    if (control.errors?.['pattern']) {
      return `${field} is invalid.`;
    }
    if (control.errors?.['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${field} must be at least ${requiredLength} characters long.`;
    }
    return `${field} has an unknown error.`;
  }

  submit() {
    this.logFormErrors()
    if (this.form.valid) {
      let data = this.createObject()
      this.authenticationService.login(data)
    }else{
      this.notificationService.Error(this.errorMessages[0])
    }
  }

}
