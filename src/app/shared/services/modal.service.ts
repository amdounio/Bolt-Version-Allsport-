import {Injectable} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationModalComponent} from "../components/confirmation-modal/confirmation-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalOptions: NgbModalOptions;

  constructor(private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: true,
      centered: true
    }
  }


  openConfirmationDialog(data: Object = {}): NgbModalRef {
    const dialogConstantsRef = this.modalService.open(ConfirmationModalComponent, this.modalOptions)
    dialogConstantsRef.componentInstance.data = {
      ...data
    }
    return dialogConstantsRef
  }

  openModal(component: any, data: Object = {}): NgbModalRef {
    const dialogConstantsRef = this.modalService.open(component, this.modalOptions)
    dialogConstantsRef.componentInstance.data = {
      ...data,
      buttonText: {
        ok: "Yes",
        cancel: "No"
      }
    }
    return dialogConstantsRef
  }

}
