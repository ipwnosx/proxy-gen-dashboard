import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyTableComponent } from './proxy-table.component';

describe('ProxyTableComponent', () => {
  let component: ProxyTableComponent;
  let fixture: ComponentFixture<ProxyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
