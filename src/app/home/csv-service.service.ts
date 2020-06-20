import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CsvServiceService {
  csvDataChanged = new Subject<object[]>();
  selectedCsvChanged = new Subject<object[]>();

  csvData = [];
  selectedCsv: [];

  constructor() {}

  addCsv(file) {
    this.csvData.push(file);
    this.csvDataChanged.next(this.csvData);

  }



}
