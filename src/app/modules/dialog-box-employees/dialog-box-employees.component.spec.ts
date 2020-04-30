import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxEmployeeComponent } from './dialog-box-employees.component';

describe('DialogBoxEmployeeComponent', () => {
  let component: DialogBoxEmployeeComponent;
  let fixture: ComponentFixture<DialogBoxEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
