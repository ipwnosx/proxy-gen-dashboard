import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyGenContainerComponent } from './proxy-gen-container.component';

describe('ProxyGenContainerComponent', () => {
  let component: ProxyGenContainerComponent;
  let fixture: ComponentFixture<ProxyGenContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyGenContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyGenContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
