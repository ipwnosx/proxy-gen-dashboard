import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleMessageComponent } from './components/simple-message/simple-message.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  simpleMessage(title: string, message: string[]) {
    const modalRef = this.modalService.open(SimpleMessageComponent, { centered: true });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }
}
