import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  standalone: true,
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent implements OnInit {

  @Input() data: any;

  #activeModal: NgbActiveModal = inject(NgbActiveModal);

  message: string | undefined;
  confirmButtonText = 'Yes';
  cancelButtonText = 'No';
  title = ''
  showConfirmButton: boolean = true;
  showCancelButton: boolean = true;

  constructor() {
  }

  ngOnInit() {
    if (this.data) {
      this.title = this.data.title || this.title;
      this.message = this.data.message;
      if(this.data.showConfirmButton != undefined && !this.data.showConfirmButton){
        this.showConfirmButton = false;
      }
      if(this.data.showCancelButton != undefined && !this.data.showCancelButton){
        this.showCancelButton = false;
      }
      if (this.data.buttonText) {
        this.confirmButtonText = this.data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = this.data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(result: boolean): void {
    this.#activeModal.close(result);
  }

}
