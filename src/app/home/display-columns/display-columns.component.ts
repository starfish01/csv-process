import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CsvServiceService } from '../csv-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-display-columns',
  templateUrl: './display-columns.component.html',
  styleUrls: ['./display-columns.component.scss'],
})
export class DisplayColumnsComponent implements OnInit, OnDestroy {
  selectedCsv: any;
  private selectedCsvSub: Subscription;

  columnTitle: string[];
  originalColumnTitle: string[];

  constructor(private csvService: CsvServiceService) {}

  ngOnInit(): void {
    this.selectedCsv = this.csvService.selectedCsv;
    if (this.selectedCsv) {
      this.setColHeadings();
    }
    this.selectedCsvSub = this.csvService.selectedCsvChanged.subscribe(
      (data) => {
        this.selectedCsv = data;
        this.setColHeadings();
      }
    );
  }

  removeColumn(colTitle) {
    this.onSaveSelected();
    const updatedArray = [];
    _.forEach(this.selectedCsv.data, (row) => {
      let newObj = {};
      _.forOwn(row, (value, key) => {
        if (key !== colTitle) {
          newObj[key] = value;
        }
      });
      updatedArray.push(newObj);
    });
    this.selectedCsv.data = updatedArray;
    this.csvService.updateCsv(this.selectedCsv);
  }

  trackByFn(index, treatment) {
    return index;
  }

  onSaveSelected() {
    const newObjArray = [];
    _.forEach(this.selectedCsv.data, (el, index, arr) => {
      // each element in object
      let newObj = {};
      _.forOwn(el, (value, key) => {
        // loop through the original titles
        _.forEach(this.originalColumnTitle, (originalKey, index) => {
          if (originalKey === key) {
            newObj[this.columnTitle[index]] = value;
          }
        });
      });
      newObjArray.push(newObj);
    });
    this.selectedCsv.data = newObjArray;
    this.csvService.updateCsv(this.selectedCsv);
  }

  setColHeadings() {
    this.columnTitle = [];
    this.columnTitle = _.clone(this.selectedCsv.columnTitle);

    this.originalColumnTitle = [];
    this.originalColumnTitle = _.clone(this.selectedCsv.columnTitle);
  }

  ngOnDestroy() {
    this.selectedCsvSub.unsubscribe();
  }
}
