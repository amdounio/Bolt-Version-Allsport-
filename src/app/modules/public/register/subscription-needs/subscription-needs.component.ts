import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../../../../core/models/form-fields.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { User } from '../../../../models/user.model';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-subscription-needs',
  templateUrl: './subscription-needs.component.html',
  styleUrl: './subscription-needs.component.scss'
})
export class SubscriptionNeedsComponent {

  title : string = "Create an account"
  subTitle : string = "Help us tailor your experience with a few quick questions."
  entity! : User
  form!: FormGroup;
  formFields: FormField[] = [
    { fieldName: 'establishmentCapacity', validators: [Validators.required], value: '' },
    { fieldName: 'sports', validators: [Validators.required], value: '' },
    { fieldName: 'frequencyMatchBroadcasts', validators: [Validators.required], value: '' },
    { fieldName: 'monthlyBudgetEventPromotion', validators: [Validators.required], value: '' },
    { fieldName: 'mainObjectiveUsing', validators: [Validators.required], value: '' },
    { fieldName: 'devicesUsedAccess', validators: [Validators.required], value: '' },
    { fieldName: 'commentsSpecificNeeds', validators: [Validators.required], value: '' },
  ]
  selectedFile : File
  functionsValidators: any[] = []
      private notificationService: NotificationService
  
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
          console.log(res);
            localStorage.setItem('user',JSON.stringify(res.user))
            this.router.navigate(['/register/favorite-sports'])
        }
      })
    }else{
       this.notificationService.Warning('Please fill all required fields');
    }
  }
}
