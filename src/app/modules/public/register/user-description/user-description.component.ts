import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from '../../../../core/models/form-fields.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { User } from '../../../../models/user.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss']
})
export class UserDescriptionComponent implements OnInit {
  title: string = "Create an account";
  subTitle: string = "Tell us more about your business";
  
  form!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  
  formFields: FormField[] = [
    { fieldName: 'businessName', validators: [Validators.required], value: '' },
    { fieldName: 'buisnessType', validators: [Validators.required], value: '' },
    { fieldName: 'adresse', validators: [Validators.required], value: '' },
    { 
      fieldName: 'phone', 
      validators: [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)], // Example for international phone numbers
      value: ''
    },
    { fieldName: 'companyName', validators: [Validators.required], value: '' }
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private uploadImage(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', this.selectedFile);
    
    // Get current user and append ID
    const user = this.authService.getUser();
    console.log("user.id")
    console.log(user.id)
    if (user && user.id) {
      formData.append('userId', user.id);
    }

    this.authService.uploadUserProfil(formData).subscribe({
      next: (response) => {
        if (response.user && response.user.photoUrl) {
          this.notificationService.Success('Profile photo updated successfully');
          this.router.navigate(['/register/choose-plan']);
        }
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.notificationService.Error(error?.error?.message || 'Failed to upload profile photo');
        // Still navigate even if photo upload fails
        this.router.navigate(['/register/choose-plan']);
      }
    });
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

      this.form = new FormGroup(controls);
      resolve(this.form);
    });
  }

  createObject(): User {
    const entity = {} as User;
    this.formFields.forEach((field) => {
      entity[field.fieldName] = this.form.get(field.fieldName)?.value ?? null;
    });
    
    // Add the photo URL from preview if available
    if (this.previewUrl) {
      entity.photoUrl = this.previewUrl;
    }
    
    return entity;
  }

  submit() {
    if (!this.form.valid) {
      this.notificationService.Warning('Please fill all required fields');
      return;
    }

    if (!this.selectedFile) {
      this.notificationService.Warning('Please upload a business logo');
      return;
    }

    const data = this.createObject();
    
    // First update user info with photo preview
    this.authService.updateUser(data).subscribe({
      next: (res) => {
        this.notificationService.Success('Business information updated successfully');
        // After successful info update, upload the actual image
        this.uploadImage();
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.notificationService.Error(err?.error?.message || 'Failed to update business information');
      }
    });
  }
}