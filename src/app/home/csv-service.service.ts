import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { SnackBarService } from './includes/snack-bar.service';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class CsvServiceService {
  csvDataChanged = new Subject<object[]>();
  selectedCsvChanged = new Subject<object>();

  csvData = [];
  selectedCsv = null;

  quickCheckRemoveSchoolsIncludes = [
    'Army',
    'Apprenticeship',
    'ABC Learning Centres',
    'Deceased',
    'Didnt leave',
    "Didn/'t",
    'hospital',
    'Drama School',
    'Early Learners',
    'Family Day Care',
    'Home Schooling',
    'Day Care',
    'In ',
    'To ',
    'Interstate',
    'Kindergarten',
    'Child Care',
    'Kinder',
    'Language School',
    'Language Centre',
    'Not Applicable',
    'Not known',
    'Not Leaving',
    'Overseas',
    'Pre-apprenticeship',
    'Seeking Apprenticeship',
    'Special School',
    'Kids',
    'TAFE',
    'PreSchool',
    'Pre School',
    'Pre-School',
    'Pre-Sch',
    'Pre Sch',
    'Pre Primary',
    'Pre-Primary',
    'University',
    'Childrens Centre',
    'YMCA',
    'United Arba Emirates',
  ];

  fillerWords = ['st', 'saint', 'school', 'college'];

  constructor(
    private cookieService: CookieService,
    private snackbarService: SnackBarService
  ) {}

  addCsv(file, quickFormat: boolean = false) {
    if (quickFormat) {
      file = this.quickFormat(file);
    }

    this.snackbarService.openSnackBar('CSV(s) Added', 'close');
    this.csvData.push(file);
    // this.setCookie();
    this.csvDataChanged.next(this.csvData);
  }

  quickFormat(file) {
    const csvData = file;
    let newData = [];

    _.forEach(csvData.data, (row) => {
      let title = row.Description;
      let value = row.Code;
      if (!title || !value) {

        // might be a previously opened document
        if (row.title && row.value) {
          title = row.title;
          value = row.value;
        } else {
          return;
        }
      }
      newData.push({
        value,
        title,
      });
    });

    newData = _.uniqBy(newData, 'title');
    newData = _.uniqBy(newData, 'value');

    if (csvData.fileName.includes('LookupSchool')) {
      newData = this.cleanSchoolLookUp(newData);
    }

    csvData.data = newData;

    return csvData;
  }

  cleanSchoolLookUp(data: Object[]) {
    const newData = [];
    // remove included values
    _.forEach(data, (element) => {
      let canAdd = true;
      _.forEach(this.quickCheckRemoveSchoolsIncludes, (key) => {
        let text = element['title'].toLowerCase();
        if (text.includes(key.toLowerCase())) {
          canAdd = false;
          return;
        }
      });
      if (canAdd) {
        newData.push(element);
      }
    });
    // remove anything under 3 words
    const filteredShortNames = [];
    _.forEach(newData, (element) => {
      const sentenceArray: [String] = element['title'].split(' ');
      if (sentenceArray.length >= 3) {
        let hasFiller = 0;

        _.forEach(this.fillerWords, (el) => {
          let findCheck = _.find(sentenceArray, (item) => {
            return item.toLowerCase() === el;
          });

          if (findCheck) {
            hasFiller++;
          }
        });

        const acceptableLength = sentenceArray.length - hasFiller;
        if (hasFiller === 0 || acceptableLength >= 3) {
          filteredShortNames.push(element);
        }
      }
    });
    return filteredShortNames;
  }

  removeCsv(fileName) {
    this.csvData = _.remove(this.csvData, (file) => {
      return file.fileName !== fileName;
    });
    if (fileName === this.selectedCsv.fileName) {
      this.selectedCsv = null;
      this.selectedCsvChanged.next(this.selectedCsv);
    }
    this.snackbarService.openSnackBar('CSV Removed', 'close');
    // this.setCookie();
    this.csvDataChanged.next(this.csvData);
  }

  clearAll() {
    this.csvData = [];
    this.deleteCookie();
    this.selectCSV = null;
    this.snackbarService.openSnackBar('All CSV(s) Removed', 'close');
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

  customSnackbarMessage(message: string, action: string) {
    this.snackbarService.openSnackBar(message, action);
  }

  updateCsv(selectedCsv: any) {
    // lodash
    const newCsvData = _.map(this.csvData, (a) => {
      return a.fileName === selectedCsv.fileName ? selectedCsv : a;
    });

    this.snackbarService.openSnackBar('CSV Updated', 'close');
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
    return cookie;
  }

  deleteCookie() {
    this.cookieService.deleteAll();
  }
}
