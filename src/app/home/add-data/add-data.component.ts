import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import * as _ from 'lodash';
import { CsvServiceService } from '../csv-service.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JsonPopupComponent } from './json-popup/json-popup.component';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  constructor(
    private papa: Papa,
    private csvDataService: CsvServiceService,
    private dialog: MatDialog
  ) {}

  quickFormat = false;
  quickFormatInfo = 'This will remove all columns bar code and description and will remove any rows without values and any duplicates. Schools will be cleaned';
  removeInvalidChars = true;


  ngOnInit(): void {}

  csvInputChange(fileInputEvent: any) {

    _.forEach(fileInputEvent.target.files, (file) => {
      const options = {
        header: true,
        delimiter: ',',
        quotes: false,
        // skipEmptyLines: 'greedy',
        complete: (result) => {
          const filename = file.name.replace('.csv', '');
          this.csvDataService.addCsv({
            fileName: filename,
            data: result.data,
          }, this.quickFormat);
        },
        transform: (res) => {
          if (!this.removeInvalidChars) {
            return res;
          }
          return res.replace(/[^\w\s\\\.\-\:\;\&\/]/gi, '');
        },
      };

      this.papa.parse(file, options);
    });
  }

  addByJson() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '800px';
    dialogConfig.width = '100vw';

    this.dialog.open(JsonPopupComponent, dialogConfig);
  }
}
