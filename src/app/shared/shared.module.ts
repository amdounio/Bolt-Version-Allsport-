import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdown, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { FormatDatePipe } from './pipes/format-date.pipe';
import { Helper } from "./helpers";
import { LastLoginPipe } from './pipes/last-login.pipe';
import { HeadingComponent } from './components/heading/heading.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

const sharedModule = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NgSelectModule,
  NgbDatepickerModule,
  FormatDatePipe,
  LastLoginPipe,
  NgbCarouselModule,
  NgbAccordionModule,
  NgbDropdownModule,
  RouterModule
];

@NgModule({
  declarations : [HeadingComponent],
  imports: sharedModule,
  exports: [...sharedModule,HeadingComponent],
  providers: [CurrencyPipe, Helper, LastLoginPipe,DatePipe]
})
export class SharedModule { }
