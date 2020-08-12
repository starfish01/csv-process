import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as _ from 'lodash';

import { CsvServiceService } from '../../csv-service.service';

@Component({
  selector: 'app-list-popup',
  templateUrl: './list-popup.component.html',
  styleUrls: ['./list-popup.component.scss'],
})
export class ListPopupComponent implements OnInit {
  public data: any;

  public fileTitle: string;

  constructor(
    public dialogRef: MatDialogRef<ListPopupComponent>,
    private csvService: CsvServiceService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  onClickSave() {
    if (!this.fileTitle) {
      return;
    }
    const arrayData = this.data.split("\n");
    const newArrayData = [];

    _.forEach(arrayData, (item) => {
      if (item.trim().length <= 0) return;

      // If each item has a comma at the end we probably want to remove it;
      const outputValue = item.substr(-1) === ',' ? item.slice(0, -1) : item;

      newArrayData.push({
        title: outputValue,
        value: outputValue
      });

    })

    this.csvService.addCsv({
      fileName: this.fileTitle,
      data: newArrayData,
    });
    this.onNoClick();
  }


}
