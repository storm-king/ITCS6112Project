import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxWorkGroupsComponent } from './dialog-box-work-groups.component';

describe('DialogBoxWorkGroupsComponent', () => {
  let component: DialogBoxWorkGroupsComponent;
  let fixture: ComponentFixture<DialogBoxWorkGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxWorkGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxWorkGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
