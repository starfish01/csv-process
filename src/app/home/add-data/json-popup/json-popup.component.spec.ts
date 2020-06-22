import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonPopupComponent } from './json-popup.component';

describe('JsonPopupComponent', () => {
  let component: JsonPopupComponent;
  let fixture: ComponentFixture<JsonPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
