import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bw-stat',
  templateUrl: './bw-stat.component.html',
  styleUrls: ['./bw-stat.component.scss']
})
export class BwStatComponent implements OnInit {

  @Input() title: string;
  
  @Input() mb: number;

  constructor() { }

  ngOnInit(): void {
  }

}
