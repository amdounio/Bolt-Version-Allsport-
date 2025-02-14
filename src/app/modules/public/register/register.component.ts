import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from '../../../core/models/form-fields.model';
import { GoogleOAuthDto } from '../../../core/models/google-auth.dto';
import { emailRegex } from '../../../shared/constant';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title: string = "Create an account";
  subTitle: string = "Fill in your information to get started";
  
  form!: FormGroup;
  showPassword: boolean = false;
  formFields: FormField[] = [
    { fieldName: 'firstname', validators: [Validators.required], value: '' },
    { fieldName: 'lastname', validators: [Validators.required], value: '' },
    { fieldName: 'email', validators: [Validators.required, Validators.pattern(emailRegex)], value: '' },
    { fieldName: 'password', validators: [Validators.required, Validators.minLength(8)], value: '' },
    { fieldName: 'confirmation', validators: [Validators.required, Validators.minLength(8)], value: '' },
    { fieldName: 'acceptLegalPolicy', validators: [], value: true }
  ];

  functionsValidators: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  buildForm() {
    return new Promise((resolve) => {
      const controls: any = {};
      this.formFields.forEach((field: FormField) => {
        controls[field.fieldName] = new FormControl(
          { value: field.value, disabled: field.disabled },
          field.validators
        );
      });

      this.form = new FormGroup(
        controls,
        this.functionsValidators.length > 0 ? this.functionsValidators : undefined
      );
      resolve(this.form);
    });
  }

  createObject(): GoogleOAuthDto {
    const entity: GoogleOAuthDto = <GoogleOAuthDto>{};
    this.formFields.forEach((field) => {
      entity[field.fieldName] = this.form.get(field.fieldName)?.value ?? null;
    });
    return entity;
  }

  submit() {
    if (!this.form.valid) {
      this.notificationService.Warning('Please fill all required fields correctly');
      return;
    }

    if (this.form.get('password')?.value !== this.form.get('confirmation')?.value) {
      this.notificationService.Error('Passwords do not match');
      return;
    }

    try {
      const data = this.createObject();
      this.authService.login(data);
    } catch (error) {
      console.error('Registration error:', error);
      this.notificationService.Error('Registration failed. Please try again.');
    }
  }
}