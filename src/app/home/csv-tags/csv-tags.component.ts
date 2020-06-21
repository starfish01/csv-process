import { Component, OnInit } from '@angular/core';
import { CsvServiceService } from '../csv-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-csv-tags',
  templateUrl: './csv-tags.component.html',
  styleUrls: ['./csv-tags.component.scss'],
})
export class CsvTagsComponent implements OnInit {
  csvData: any[];
  private csvDataSub: Subscription;

  selectedCsv: any;
  private selectedCsvSub: Subscription;

  constructor(private csvDataService: CsvServiceService) {}

  ngOnInit(): void {
    this.csvData = this.csvDataService.csvData;
    this.csvDataSub = this.csvDataService.csvDataChanged.subscribe((data) => {
      this.csvData = data;
    });

    this.selectedCsv = this.csvDataService.selectedCsv;
    this.selectedCsvSub = this.csvDataService.selectedCsvChanged.subscribe(
      (data) => {
        this.selectedCsv = data;
      }
    );
  }

  onSelectCsv(csv: Object) {
    this.csvDataService.selectCSV(csv);
  }

  ngOnDestroy() {
    this.csvDataSub.unsubscribe();
    this.selectedCsvSub.unsubscribe();
  }

  onRemove(fileName: string) {
    this.csvDataService.removeCsv(fileName);
  }

  onClearAll() {
    this.csvDataService.clearAll();
  }
}
