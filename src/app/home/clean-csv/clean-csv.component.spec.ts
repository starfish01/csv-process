import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanCsvComponent } from './clean-csv.component';

describe('CleanCsvComponent', () => {
  let component: CleanCsvComponent;
  let fixture: ComponentFixture<CleanCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
