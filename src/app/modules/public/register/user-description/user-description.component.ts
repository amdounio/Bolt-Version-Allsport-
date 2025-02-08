import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GoogleOAuthDto } from '../../../../core/models/google-auth.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../../core/models/form-fields.model';
import { emailRegex } from '../../../../shared/constant';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { User } from '../../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrl: './user-description.component.scss'
})
export class UserDescriptionComponent {
  images: string[] = [
    "assets/images/stadium.png",
    "assets/images/stadium.png",
    "assets/images/stadium.png"
  ]
  title : string = "Create an account"
  subTitle : string = "Describe yourself as clearly so that there are no mistakes."
  entity! : User
  form!: FormGroup;
  formFields: FormField[] = [
    { fieldName: 'businessName', validators: [Validators.required], value: '' },
    { fieldName: 'buisnessType', validators: [Validators.required], value: '' },
    { fieldName: 'adresse', validators: [Validators.required], value: '' },
    { fieldName: 'phone', validators: [Validators.required], value: '' },
    { fieldName: 'companyName', validators: [Validators.required], value: '' },
  ]
  selectedFile : File
  functionsValidators: any[] = []
  constructor(private config: NgbCarouselConfig, private service : AuthenticationService, private router : Router) {
    this.config.showNavigationArrows = false
  }

  ngOnInit(): void {
    this.entity = this.service.getUser();
    this.buildForm()
    // this.loadData(this.entity.id)
  }

  


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Get the first file selected
      console.log('File selected:', this.selectedFile);
    }
  }

  buildForm() {
    return new Promise((resolve) => {
      const controls: any = {};
      this.formFields.forEach((field: FormField) => {
        controls[field.fieldName] = new FormControl({ value: this.entity[field.fieldName], disabled: field.disabled }, field.validators);
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
    data.id = this.entity.id
    if (this.form.valid) {
      this.service.updateUser(data).subscribe({
        next: res=>{
            localStorage.setItem('user',JSON.stringify(res.user))
            this.router.navigate(['/register/choose-plan'])
  
        }
      })
    }
  }
}
