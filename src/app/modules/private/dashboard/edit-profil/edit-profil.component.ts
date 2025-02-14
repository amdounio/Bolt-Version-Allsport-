import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from 'src/app/core/models/form-fields.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { emailRegex } from 'src/app/shared/constant';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  user: User;
  private userSubscription: Subscription;
  
  formFields: FormField[] = [
    { fieldName: 'email', validators: [Validators.required, Validators.pattern(emailRegex)], value: '' },
    { fieldName: 'firstName', validators: [Validators.required], value: '' },
    { fieldName: 'lastName', validators: [Validators.required], value: '' },
    { fieldName: 'businessName', validators: [Validators.required], value: '' },
    { fieldName: 'buisnessType', validators: [Validators.required], value: '' },
    { fieldName: 'adresse', validators: [Validators.required], value: '' },
    { fieldName: 'phone', validators: [Validators.required], value: '' },
    { fieldName: 'language', validators: [], value: '' },
  ];

  functionsValidators: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Subscribe to user updates
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.user.photoUrl = environment.backUrl + this.user.photoUrl;
        this.buildForm(); // Rebuild form with new user data
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  appleSign() {
    this.authService.apple();
  }

  uploadImage(event: any) {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', event.target.files[0]);
    formData.append('userId', this.authService.getUser().id);

    this.authService.uploadUserProfil(formData).subscribe({
      next: res => {
        this.notificationService.Success("Photo téléchargée avec succès");
        // No need to manually update user here as it's handled by the subscription
      },
      error: err => {
        console.error('Upload failed:', err);
        this.notificationService.Error("Échec du téléchargement de la photo");
      }
    });
  }

  buildForm() {
    return new Promise((resolve) => {
      const controls: any = {};
      this.formFields.forEach((field: FormField) => {
        controls[field.fieldName] = new FormControl(
          { value: this.user[field.fieldName], disabled: field.disabled },
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

  createObject(): User {
    const entity: User = <User>{};
    this.formFields.forEach((field) => {
      entity[field.fieldName] = this.form.get(field.fieldName)?.value ?? null;
    });
    return entity as User;
  }

  submit() {
        const data = this.createObject();
        //  console.log(data)

    /*if (!this.form.valid) {
            console.log("this.form.valid")

      console.log(this.form.valid)
      return;
    }*/
      console.log("this.user user")

      console.log(this.user)


    data.id = this.user.id;

    this.authService.updateUser(data).subscribe({
      next: res => {
        this.notificationService.Success("Vos informations sont mises à jour.");
        this.router.navigate(['/dashboard/profil'], { queryParams: { updated: true } });
      },
      error: err => {
        this.notificationService.Error(err?.error?.message || "Échec de la mise à jour");
        console.error('Update failed:', err);
      },
    });
  }
}