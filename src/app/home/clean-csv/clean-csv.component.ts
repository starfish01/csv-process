import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CsvServiceService } from '../csv-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-clean-csv',
  templateUrl: './clean-csv.component.html',
  styleUrls: ['./clean-csv.component.scss'],
})
export class CleanCsvComponent implements OnInit, OnDestroy {
  selectedCsv: any;
  private selectedCsvSub: Subscription;

  columnTitles: string[];

  constructor(private csvService: CsvServiceService) {}

  ngOnInit(): void {
    this.selectedCsv = this.csvService.selectedCsv;
    this.selectedCsvSub = this.csvService.selectedCsvChanged.subscribe(
      (data) => {
        this.selectedCsv = data;
      }
    );
  }

  removeDuplicates(title: string) {
    this.selectedCsv.data = _.uniqBy(this.selectedCsv.data, title);
    this.csvService.updateCsv(this.selectedCsv);
  }

  removeEmptyVaules(title: string) {
    this.selectedCsv.data = _.filter(this.selectedCsv.data, (o) => { return o[title]; });
    this.csvService.updateCsv(this.selectedCsv);
  }

  ngOnDestroy() {
    this.selectedCsvSub.unsubscribe();
  }
}
