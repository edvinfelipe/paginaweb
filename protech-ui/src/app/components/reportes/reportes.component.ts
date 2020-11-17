import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';
/* import * as pluginAnnotations from 'chartjs-plugin-annotation'; */
import { ReportesService } from '../../services/reportes.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';  

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total' }
  ];
  // --------------------------------------- Datos gráfico de líneas 1 ------------------------------------------------------
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(26, 42,64,0.1)',
      backgroundColor: 'rgba(69,202,101,0.50)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  locale = 'es';

  dateInit: Date;
  dateEnd: Date;
  minCovDate: Date;
  maxCovDate: Date;


  // --------------------------------------- Datos gráfico de pie 1 (Marcas) ------------------------------------------------------
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabelsMarcas: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDataMarcas: SingleDataSet = [300, 500, 100];
  public pieChartTypeMarcas: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // --------------------------------------- Datos gráfico de pie 2 ------------------------------------------------------
  public pieChartLabelsCategorias: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDataCategorias: SingleDataSet = [300, 500, 100];
  public pieChartTypeCategorias: ChartType = 'pie';
 // ------------------------------------------------------------------------------------------------------------------------
  constructor(
    private _reportesService: ReportesService,
    private datePipe: DatePipe
  ) { 
    this.minCovDate = new Date('2020-1-1');
    this.maxCovDate = new Date();
    this.maxCovDate.setDate(this.maxCovDate.getDate() - 1);
  }
  ngOnInit(): void {

  }



  obtener(): void{
    let date1 = $('#date1').val();
    

    let date2 = $('#date2').val();
    
    if( (date1 === '') || (date2 === '')){
      alert('¡Datos incompletos! Una o varias fechas están vacías.')
    } else if(Date.parse(date1) > Date.parse(date2)){
      alert('La primer fecha no puede ser mayor a la segunda  .')
    }
    else if (date1 && date2) {
      date1 = new Date(date1);
      date2 = new Date(date2);
      this._reportesService.twoDates(date1, date2).subscribe();

      forkJoin([
        this._reportesService.twoDates(date1, date2).pipe(map(data => data.map(val => val.total))),
        this._reportesService.twoDates
          (date1, date2).pipe(map(data => data.map(val => this.datePipe.transform(val.fecha_venta, 'dd/MM'))))
      ]).subscribe((
        [data0, data1]
      ) => {
        this.lineChartData[0].data = data0;
        this.lineChartLabels = data1;
      });
    }
  }
}
