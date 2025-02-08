import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'progress-circle',
  templateUrl: './progress-circle.component.html',
  standalone: true,
  imports: [
    NgStyle
  ],
  styleUrl: './progress-circle.component.css'
})
export class ProgressCircleComponent {

  @Input() progress: number = 0;
  @Input() error: boolean = false;
  
}
