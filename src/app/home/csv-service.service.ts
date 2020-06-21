import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CsvServiceService {
  csvDataChanged = new Subject<object[]>();
  selectedCsvChanged = new Subject<object>();

  csvData = [];
  selectedCsv = null;

  constructor(private cookieService: CookieService) {}

  addCsv(file) {

    this.csvData.push(file);
    // this.setCookie();
    this.csvDataChanged.next(this.csvData);
  }

  removeCsv(fileName) {
    this.csvData = _.remove(this.csvData, (file) => {
      return file.fileName !== fileName;
    });
    if (fileName === this.selectedCsv.fileName) {
      this.selectedCsv = null;
      this.selectedCsvChanged.next(this.selectedCsv);
    }
    // this.setCookie();
    this.csvDataChanged.next(this.csvData);
  }

  clearAll() {
    this.csvData = [];
    this.deleteCookie();
    this.selectCSV = null;
    this.selectedCsvChanged.next(this.selectCSV);
    this.csvDataChanged.next(this.csvData);
  }

  selectCSV(selectedCsv) {
    const columnTitle = [];
    _.forOwn(selectedCsv.data[0], (value, key) => {
      columnTitle.push(key);
    });
    selectedCsv.columnTitle = columnTitle;
    this.selectedCsv = selectedCsv;
    // this.setCookie();
    this.selectedCsvChanged.next(this.selectedCsv);
  }

  updateCsv(selectedCsv: any) {

    // lodash
    const newCsvData = _.map(this.csvData, (a) => {
      return a.fileName === selectedCsv.fileName ? selectedCsv : a;
    });

    this.selectCSV(selectedCsv);
    this.csvData = newCsvData;
    // this.setCookie();
    this.csvDataChanged.next(this.csvData);
  }

  boot() {
    const stringData = this.getCookie();
    if (stringData.length !== 0) {
      this.csvData = JSON.parse(stringData);
      this.csvDataChanged.next(this.csvData);
    } else {
      this.csvData = [];
      this.csvDataChanged.next(this.csvData);
    }
  }

  setCookie() {
    const data = JSON.stringify(this.csvData);
    this.cookieService.set('synergetic-data', data);
  }

  getCookie() {
    const cookie = this.cookieService.get('synergetic-data');
    console.log('get Cookie');
    console.log(cookie);
    return cookie
  }

  deleteCookie() {
    this.cookieService.deleteAll();
  }
}
