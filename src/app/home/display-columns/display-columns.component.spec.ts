import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayColumnsComponent } from './display-columns.component';

describe('DisplayColumnsComponent', () => {
  let component: DisplayColumnsComponent;
  let fixture: ComponentFixture<DisplayColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
