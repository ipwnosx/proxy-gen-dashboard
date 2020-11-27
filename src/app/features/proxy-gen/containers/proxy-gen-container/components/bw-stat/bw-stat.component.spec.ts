import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BwStatComponent } from './bw-stat.component';

describe('BwStatComponent', () => {
  let component: BwStatComponent;
  let fixture: ComponentFixture<BwStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BwStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BwStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
