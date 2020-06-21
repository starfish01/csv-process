import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CsvServiceService } from '../csv-service.service';
import { Papa } from 'ngx-papaparse';

import { Clipboard } from "@angular/cdk/clipboard"


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  selectedCsv: any;
  private selectedCsvSub: Subscription;

  constructor(private csvService: CsvServiceService, private papa: Papa, private clipboard: Clipboard) {}

  ngOnInit(): void {
    this.selectedCsv = this.csvService.selectedCsv;
    this.selectedCsvSub = this.csvService.selectedCsvChanged.subscribe(
      (data) => {
        this.selectedCsv = data;
      }
    );
  }

  onCopyJson() {
    console.log(this.selectedCsv.data);
    this.clipboard.copy(JSON.stringify(this.selectedCsv.data));
  }

  onDownloadCsv() {
    const file = this.papa.unparse(this.selectedCsv.data, { header: true });
    let blob = new Blob(['\ufeff' + file], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", this.selectedCsv.fileName + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
}
