import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTileComponent } from './new-tile.component';

describe('NewTileComponent', () => {
  let component: NewTileComponent;
  let fixture: ComponentFixture<NewTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
