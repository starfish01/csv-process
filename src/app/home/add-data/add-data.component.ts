import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import * as _ from 'lodash';
import { CsvServiceService } from '../csv-service.service';

import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { JsonPopupComponent } from './json-popup/json-popup.component';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  constructor(private papa: Papa, private csvDataService: CsvServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  csvInputChange(fileInputEvent: any) {

    _.forEach(fileInputEvent.target.files, (file) => {
      const options = {
        header: true,
        complete: (result) => {
          const filename = file.name.replace('.csv', '')
          this.csvDataService.addCsv({
            fileName: filename,
            data: result.data
          });
        }
      };


      this.papa.parse(file,options);
    });

  }

  addByJson(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '800px';
    dialogConfig.width = '100vw';

    this.dialog.open(JsonPopupComponent, dialogConfig);
  }

}
