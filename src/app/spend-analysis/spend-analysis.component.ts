import { Component, OnInit, Input } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'spend-analysis',
  templateUrl: './spend-analysis.component.html',
  styleUrls: ['./spend-analysis.component.css']
})
export class SpendAnalysisComponent {
  @Input() pieChartLabels:Label[];
  @Input() pieChartData: SingleDataSet;
  @Input() pieChartType: ChartType;
  @Input() pieChartLegend = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  // public pieChartLabels: Label[] = [['INSURANCE'], ['SAVING'], ['GAS'], ['ENTERTAINMENT'], ['CAR'], ['MOVING']];
  // public pieChartData: SingleDataSet = [10, 7, 3, 10, 20, 50];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

}
