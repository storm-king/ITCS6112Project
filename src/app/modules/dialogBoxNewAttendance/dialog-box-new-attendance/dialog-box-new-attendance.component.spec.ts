import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxNewAttendanceComponent } from './dialog-box-new-attendance.component';

describe('DialogBoxNewAttendanceComponent', () => {
  let component: DialogBoxNewAttendanceComponent;
  let fixture: ComponentFixture<DialogBoxNewAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxNewAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxNewAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
