import { Component, OnInit, OnDestroy } from '@angular/core';
import { CsvServiceService } from './csv-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  csvData: any[];
  private csvDataSub: Subscription;

  selectedCsv: any;
  private selectedCsvSub: Subscription;

  viewSelected: string = 'export';


  constructor(private csvService: CsvServiceService) { }

  ngOnInit(): void {
    this.csvService.boot();
    this.csvData = this.csvService.csvData;
    this.csvDataSub = this.csvService.csvDataChanged.subscribe((data) => {
      this.csvData = data;
    });

    this.selectedCsv = this.csvService.selectedCsv;
    this.selectedCsvSub = this.csvService.selectedCsvChanged.subscribe(
      (data) => {
        this.selectedCsv = data;
        this.viewSelected = 'export';
      }
    );


  }

  onViewChange(option) {
    this.viewSelected = option;
  }

  ngOnDestroy() {
    this.csvDataSub.unsubscribe();
    this.selectedCsvSub.unsubscribe();
  }



}
