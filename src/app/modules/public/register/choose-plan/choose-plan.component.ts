import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { Plans } from '../../../../core/enums/plans.enum';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrl: './choose-plan.component.scss'
})
export class ChoosePlanComponent {
  entity!: User;
  PLANS = Plans
  title : string = "choose your plan"
  subTitle : string = "And find the perfect deal for you."
  constructor(private service: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.entity = this.service.getUser();
    // this.loadData(this.entity.id)
  }

  loadData(id: any): Promise<User> {
    return new Promise((resolve, reject) => {
      this.service.getOneObservable(id).subscribe({
        next: (data: User) => {
          this.entity = data;
          // @ts-ignore
          this.form.patchValue(this.entity);
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }





  submit(plan: string) {
      this.service.planSubscription(plan).subscribe({
        next: res => {
          if (res.url) {
            window.location.replace(res.url) 
          }
          if (plan === Plans.FREE) {
            this.router.navigate(['/register/subscription-needs'])
          }
        },
        error: error => {
          console.error(error);

        }
      });
  }

  
}
