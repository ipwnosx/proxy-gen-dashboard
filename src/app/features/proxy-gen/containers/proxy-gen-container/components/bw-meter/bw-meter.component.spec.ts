import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BwMeterComponent } from './bw-meter.component';

describe('BwMeterComponent', () => {
  let component: BwMeterComponent;
  let fixture: ComponentFixture<BwMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BwMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BwMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
