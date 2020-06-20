import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import * as _ from 'lodash';
import { CsvServiceService } from '../csv-service.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  constructor(private papa: Papa, private csvDataService: CsvServiceService) {}

  ngOnInit(): void {}

  csvInputChange(fileInputEvent: any) {

    _.forEach(fileInputEvent.target.files, (file) => {
      let options = {
        header: true,
        complete: (result) => {
          let filename = file.name.replace('.csv', '')
          this.csvDataService.addCsv({
            fileName: filename,
            data: result.data
          });
        }
      };

      this.papa.parse(file,options);
    });

  }
}
