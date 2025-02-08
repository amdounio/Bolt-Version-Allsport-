import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BasicComponent } from '../../../core/components/basic-component';
import { Login } from '../../../models/login.model';
import { GoogleOAuthDto } from '../../../core/models/google-auth.dto';
import { emailRegex, googleClientId } from '../../../shared/constant';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../core/models/form-fields.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [],
})
export class LoginComponent  implements OnInit{
  images : string[]=[
    "assets/images/stadium.png",
    "assets/images/stadium.png",
    "assets/images/stadium.png"
  ]

  form!: FormGroup;
  formFields: FormField[] = [
    { fieldName: 'email', validators: [Validators.required, Validators.pattern(emailRegex)], value: '' },
    { fieldName: 'password', validators: [Validators.required, Validators.minLength(8)], value: '' },
    { fieldName: 'rememberMe', validators: [], value: '' },
  ];

  functionsValidators: any[] = []


  constructor( private authService: AuthenticationService,private config : NgbCarouselConfig, private router : Router){
    this.config.showNavigationArrows = false
    // this.authService.socialAuthInit()
    
  }

ngOnInit(): void {
  this.buildForm()
}
 appleSign(){
  this.authService.apple()
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
  const entity: GoogleOAuthDto = <GoogleOAuthDto>{}
  this.formFields.forEach((field) => {
    // @ts-ignore
    entity[field.fieldName] = this.form.get(field.fieldName)?.value || null;
  });
  return entity as GoogleOAuthDto;
}


submit() {
  let data = this.createObject()
  this.authService.login(data)
}

}
