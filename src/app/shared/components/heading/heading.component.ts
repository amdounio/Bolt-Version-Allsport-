import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],

})
export class HeadingComponent   {
  @Input() title : string
  @Input() subTitle : string
  @Input() nextButon : string
  @Input() isDisabled : boolean
  @Input() textLeft : boolean = false
  constructor() { }


}
