import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple-message',
  templateUrl: './simple-message.component.html',
  styleUrls: ['./simple-message.component.scss']
})
export class SimpleMessageComponent implements OnInit {

  @Input() title: string;
  
  @Input() message: string[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
