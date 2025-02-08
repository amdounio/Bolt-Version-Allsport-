import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../../../../core/models/form-fields.model';
import { GoogleOAuthDto } from '../../../../core/models/google-auth.dto';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { emailRegex } from '../../../../shared/constant';
import { User } from '../../../../models/user.model';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
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


  constructor( private authService: AuthenticationService, private router : Router,  private activatedRoute: ActivatedRoute  ){
    // this.authService.socialAuthInit()
    
    
  }

ngOnInit(): void {


  this.activatedRoute.queryParams.subscribe((params) => {
    if (params['updated']) {
      this.refreshData(); // Fetch updated data when 'updated' is present
    }
  });

  this.user = this.authService.getUser()
  this.user.photoUrl = environment.backUrl + this.user.photoUrl


  this.buildForm()
}
 appleSign(){
  this.authService.apple()
 }


 refreshData() {
  // Refresh user data directly from the stored user object
  this.user = this.authService.getUser();
  this.user.photoUrl = environment.backUrl + this.user.photoUrl;

  // Rebuild the form with updated user data
  this.buildForm();
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


submit() {
  let data = this.createObject()
  data.id = this.user.id
  if (this.form.valid) {
    this.authService.updateUser(data).subscribe({
      next: res=>{
          localStorage.setItem('user',JSON.stringify(res.user))
          this.user = res.user
          this.user.photoUrl = environment.backUrl + this.user.photoUrl

          // this.router.navigate(['/register/choose-plan'])

      },
      error(err) {
          console.log(err);
          
      },
    })
  }
}

logout(){
  this.authService.logout()
}

}
