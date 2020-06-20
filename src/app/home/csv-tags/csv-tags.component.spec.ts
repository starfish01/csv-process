import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvTagsComponent } from './csv-tags.component';

describe('CsvTagsComponent', () => {
  let component: CsvTagsComponent;
  let fixture: ComponentFixture<CsvTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
