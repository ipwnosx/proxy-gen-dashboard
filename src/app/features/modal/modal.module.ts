import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SimpleMessageComponent } from './components/simple-message/simple-message.component';
import { ModalService } from './modal.service';



@NgModule({
  declarations: [SimpleMessageComponent],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    SimpleMessageComponent,
  ],
  entryComponents: [
    SimpleMessageComponent,
  ],
  providers: [
    ModalService,
  ]
})
export class ModalModule { }
