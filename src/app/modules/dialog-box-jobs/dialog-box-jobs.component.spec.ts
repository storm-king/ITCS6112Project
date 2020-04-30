import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxJobsComponent } from './dialog-box-jobs.component';

describe('DialogBoxJobsComponent', () => {
  let component: DialogBoxJobsComponent;
  let fixture: ComponentFixture<DialogBoxJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
