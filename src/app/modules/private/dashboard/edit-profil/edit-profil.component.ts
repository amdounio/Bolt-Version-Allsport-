import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from 'src/app/core/models/form-fields.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { emailRegex } from 'src/app/shared/constant';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent  implements OnInit {
  form!: FormGroup;
  user : User
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
  
  
    functionsValidators: any[] = []
  
  
    constructor( private authService: AuthenticationService, private router : Router, private notificationService : NotificationService){
      // this.authService.socialAuthInit()
      
    }
  
  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.user.photoUrl = environment.backUrl + this.user.photoUrl
  
  
    this.buildForm()
  }
   appleSign(){
    this.authService.apple()
   }
  
   buildForm() {
    return new Promise((resolve) => {
      const controls: any = {};
      this.formFields.forEach((field: FormField) => {
        controls[field.fieldName] = new FormControl({ value: this.user[field.fieldName], disabled: field.disabled }, field.validators);
      })
  
      if (this.functionsValidators.length === 0) {
        this.form = new FormGroup(controls);
      } else {
        this.form = new FormGroup(controls, this.functionsValidators);
      }
      resolve(this.form);
    });
  }
  
  createObject(): User {
    const entity: User = <User>{}
    this.formFields.forEach((field) => {
      // @ts-ignore
      entity[field.fieldName] = this.form.get(field.fieldName)?.value || null;
    });
    return entity as User;
  }


  uploadImage(event) {
    let formData = new FormData()
    formData.append('photo', event.target.files[0])
    formData.append('userId', this.authService.getUser().id)
    this.authService.uploadUserProfil(formData).subscribe({
      next: res => {
        this.notificationService.Success("Photo téléchargée avec succès")
        this.user = res.user
        this.user.photoUrl = environment.backUrl + this.user.photoUrl
      },
      error: err => {
        console.log(err);

      }
    })
  }
  
  
  submit() {
    let data = this.createObject();
    data.id = this.user.id;
    if (this.form.valid) {
      this.authService.updateUser(data).subscribe({
        next: res => {
          this.notificationService.Success("Vos informations sont mises à jour.");
          localStorage.setItem('user', JSON.stringify(res.user));
          this.user = res.user;
          this.user.photoUrl = environment.backUrl + this.user.photoUrl;
  
          this.router.navigate(['/dashboard/profil'], { queryParams: { updated: true } });

        },
        error: err => {
          this.notificationService.Error(err?.error?.message);
          console.log(err);
        },
      });
    }
  }
  
  
  logout(){
    this.authService.logout()
  }
  

}
